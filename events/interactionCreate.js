const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if (!SlashCommands) return;
        try {
            SlashCommands.run(client, interaction);
        } catch (error) {
            if (interaction.replied || interaction.deferred) {
                await interaction.editReply({
                    content: `An unexpected error occurred.`
                }).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexpected error occurred.`
                }).catch(() => {});
            }
            console.error(error);
        }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    // Saldırı İptal Butonu Yönetimi
    if (interaction.isButton()) {
        if (interaction.customId.startsWith('cancel_attack_')) {
            const attackId = interaction.customId.split('_')[2];
            const activeAttack = client.activeAttacks.get(attackId);

            if (activeAttack) {
                activeAttack.cancel(); // Saldırıyı iptal et
                client.activeAttacks.delete(attackId); // Aktif saldırılardan kaldır

                await interaction.update({
                    content: 'Saldırı başarıyla iptal edildi.',
                    embeds: [],
                    components: []
                });
            } else {
                await interaction.update({
                    content: 'Bu saldırı zaten tamamlanmış veya iptal edilmiş.',
                    embeds: [],
                    components: []
                });
            }
        }
    }
});
                    
