const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${dn}.glitch.me/`);
}, 280000);

////////////////////

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const Canvas = require("canvas");
const jimp = require("jimp");
let points = {}

//////////////////////
client.on("ready", () => {
  console.log(`Logged in ${client.user.tag}!`);
});
/////////////////////|
const dn = process.env.dn

const prefix = process.env.prefix; 

const devs = process.env.devs
////////////////////|

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (!message.channel.guild) return;
    message.channel;
    message.channel.send("NINJA").then(msg => {
      if (!message.channel.guild) return;
      message.channel;
      var PinG = `${Date.now() - msg.createdTimestamp}`;
      var ApL = `${Math.round(client.ping)}`;
      msg.edit(
        `\`\`\`javascript\nTime taken: ${PinG} ms.\nDiscord API: ${ApL} ms.\`\`\``
      );
    });
  }
});

///////"////"///////|
client.on("message", message => {
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "فكك") ||
    message.content.startsWith(prefix + "fkk")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./fkk.json");
    const item = type[Math.floor(Math.random() * type.length)];
    let author = message.author;
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لتفكيك الكلمه**").then(msg => {
      const w = ["./1.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(70, 80, 63, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${
                collected.first().author
              } ✅ احسنت لقد تمكنت من تفكيك الكلمه بسرعه`
            );
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: لم يتمكن احد من تفكيك الكلمه في الوقت المناسب`
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "لغز") ||
    message.content.startsWith(prefix + "puzzle")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./quiz.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لحل هذه اللغز**").then(msg => {
      const w = ["./1.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(70, 80, 63, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${collected.first().author} ✅ احسنت لقت تمكنت من حل اللغز`
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x:لم يتمكن احد من حل اللغز `
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "ركب") ||
    message.content.startsWith(prefix + "rkb")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./rkb.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لتركيب الكلمه**").then(msg => {
      const w = ["./1.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(70, 80, 63, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            maxMatches: 1,
            time: 30000,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${collected.first().author} ✅ احسنت لقد ركبت الكلمة`
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: لم يتمكن احد من تركيب الكلمة`
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "اسرع") ||
    message.content.startsWith(prefix + "fast")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./type.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel
      .send("** لديك __15__ ثانيه لكتابه هذه الكلمه بسرعة**")
      .then(msg => {
        const w = ["./1.png"];
        let Image = Canvas.Image,
          canvas = new Canvas(400, 150),
          ctx = canvas.getContext("2d");

        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
          err,
          Background
        ) {
          if (err) return console.log(err);
          let BG = Canvas.Image;
          let ground = new Image();
          ground.src = Background;
          ctx.drawImage(ground, 0, 0, 400, 150);
        });
        let url = message.author.displayAvatarURL.endsWith(".webp")
          ? message.author.displayAvatarURL.slice(5, -20) + ".png"
          : message.author.displayAvatarURL;
        jimp.read(url, (err, ava) => {
          if (err) return console.log(err);
          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
            if (err) return console.log(err);

            ctx.font = "20px Arial";
            ctx.fontSize = "10px";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText(`${item.type} `, 250, 100);

            let Avatar = Canvas.Image;
            let ava = new Avatar();
            ava.src = buf;
            ctx.beginPath();
            ctx.arc(70, 80, 63, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(ava, 0, 0, 0, 0);
            message.channel.sendFile(canvas.toBuffer());
          });

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 30000,
              errors: ["time"]
            }) //وقت الاجابة
            .then(collected => {
              var embed = new Discord.RichEmbed().setDescription(
                `${
                  collected.first().author
                } ✅ **احسنت لقد تمكنت من كتابه هذه الكلمه بسرعه**`
              );
              .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
              message.channel.send(embed);
              console.log(
                `[Typing] ${collected.first().author} typed the word.`
              );
              let won = collected.first().author;
              points[won.id].points++;
            })
            .catch(collected => {
              var embed1 = new Discord.RichEmbed().setDescription(
                `:x: **لم يتمكن احد من كتابه هذه الكلمه في الوقت المناسب**`
              );
              .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
              message.channel.send(embed1);
              console.log("[Typing] Error: No one type the word.");
            });
        });
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!points[message.author.id])
    points[message.author.id] = {
      points: 0,
      id: message.author.id
    };
  if (
    message.content.startsWith(prefix + "رياضيات") ||
    message.content.startsWith(prefix + "math")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));

    const type = require("./math.json");
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {
      return item.answers.some(
        answer => answer.toLowerCase() === response.content.toLowerCase()
      );
    };
    message.channel.send("**لديك __15__ ثانيه لحل المسئله**").then(msg => {
      const w = ["./1.png"]; //الخلفيه
      let Image = Canvas.Image,
        canvas = new Canvas(400, 150),
        ctx = canvas.getContext("2d");

      fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(
        err,
        Background
      ) {
        if (err) return console.log(err);
        let BG = Canvas.Image;
        let ground = new Image();
        ground.src = Background;
        ctx.drawImage(ground, 0, 0, 400, 150);
      });
      let url = message.author.displayAvatarURL.endsWith(".webp")
        ? message.author.displayAvatarURL.slice(5, -20) + ".png"
        : message.author.displayAvatarURL;
      jimp.read(url, (err, ava) => {
        if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

          ctx.font = "20px Arial";
          ctx.fontSize = "10px";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "center";
          ctx.fillText(`${item.type} `, 250, 100);

          let Avatar = Canvas.Image;
          let ava = new Avatar();
          ava.src = buf;
          ctx.beginPath();
          ctx.arc(70, 80, 63, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(ava, 0, 0, 0, 0);
          message.channel.sendFile(canvas.toBuffer());
        });

        message.channel
          .awaitMessages(filter, {
            thing: true,
            maxMatches: 1,
            time: 60000,
            maxUses: 1,
            errors: ["time"]
          }) //وقت الاجابة
          .then(collected => {
            var embed = new Discord.RichEmbed().setDescription(
              `${
                collected.first().author
              } ✅ **احسنت لقد تمكنت من أجابه عن معادله بسرعه**`
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: **لم يتمكن احد من حل معادله في الوقت المناسب**`
            );
            .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
            message.channel.send(embed1);
            console.log("[Typing] Error: No one type the word.");
          });
      });
    });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "top"))
    if (message.counet.startsWith(prefix + "توب")) {
      let _top = 1;
      let topp = Object.values(points);
      let top = topp
        .slice(0, 10)
        .map(
          users =>
            `**\`.${_top++}\` | <@${users.id}> \`Points: ${users.points}\`**`
        )
        .sort((a, b) => a > b)
        .join("\n");
      const prefixlor = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription(top, true);

      message.channel.sendEmbed(prefixlor);
    }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (
    message.content.startsWith(prefix + "نقاطي") ||
    message.content.startsWith(prefix + "points")
  ) {
    if (!message.channel.guild)
      return message
        .reply("**هذا الأمر للسيرفرات فقط**")
        .then(m => m.delete(3000));
    let userData = points[message.author.id];
    let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.tag}`, message.author.avatarURL)
      .setColor("#000000")
      .setDescription(`**Points:** \`${userData.points}\``);
      .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "xo")) {
    let array_of_mentions = message.mentions.users.array();
    let symbols = [":o:", ":heavy_multiplication_x:"];
    var grid_message;

    if (array_of_mentions.length == 1 || array_of_mentions.length == 2) {
      let random1 = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
      let random2 = Math.abs(random1 - 1);
      if (array_of_mentions.length == 1) {
        random1 = 0;
        random2 = 0;
      }
      var player1_id = message.author.id;
      let player2_id = array_of_mentions[random2].id;
      var turn_id = player1_id;
      var symbol = symbols[0];
      let initial_message = `اللعبة بين اللاعبين التاليين <@${player1_id}> and <@${player2_id}>!`;
      if (player1_id == player2_id) {
        initial_message += "\n_(لقد خسرت, العب مع نفسك :joy:)_";
      }
      message.channel
        .send(`Xo ${initial_message}`)
        .then(console.log("Successful tictactoe introduction"))
        .catch(console.error);
      message.channel
        .send(
          ":one::two::three:" +
            "\n" +
            ":four::five::six:" +
            "\n" +
            ":seven::eight::nine:"
        )
        .then(new_message => {
          grid_message = new_message;
        })
        .then(console.log("Successful tictactoe game initialization"))
        .catch(console.error);
      message.channel
        .send("Loading... Please wait for the :ok: reaction.")
        .then(async new_message => {
          await new_message.react("1⃣");
          await new_message.react("2⃣");
          await new_message.react("3⃣");
          await new_message.react("4⃣");
          await new_message.react("5⃣");
          await new_message.react("6⃣");
          await new_message.react("7⃣");
          await new_message.react("8⃣");
          await new_message.react("9⃣");
          await new_message.react("🆗");
          await new_message
            .edit(`It\'s <@${turn_id}>\'s اشتغل! الرمز هو ${symbol}`)
            .then(new_new_message => {
              require("./xo.js")(
                client,
                message,
                new_new_message,
                player1_id,
                player2_id,
                turn_id,
                symbol,
                symbols,
                grid_message
              );
            })
            .then(
              console.log("Successful tictactoe listeprefix initialization")
            )
            .catch(console.error);
        })
        .then(console.log("Successful tictactoe react initialization"))
        .catch(console.error);
    } else {
      message.channel
        .send(`جرب *xo @uesr`)
        .then(console.log("Successful error reply"))
        .catch(console.error);
    }
  }
});

client.on("message", function(message) {
  if (message.content.startsWith(prefix + "rps")) {
    let messageArgs = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    let messageRPS = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    let arrayRPS = ["**# - Rock**", "**# - Paper**", "**# - Scissors**"];
    let result = `${arrayRPS[Math.floor(Math.random() * arrayRPS.length)]}`;
    var RpsEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setThumbnail(message.author.avatarURL)
      .addField("Rock", "🇷", true)
      .addField("Paper", "🇵", true)
      .addField("Scissors", "🇸", true);
      .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
    message.channel.send(RpsEmbed).then(msg => {
      msg.react("🇸");
      msg.react("🇷");
      msg
        .react("🇵")
        .then(() => msg.react("🇸"))
        .then(() => msg.react("🇷"))
        .then(() => msg.react("🇵"));
      let reaction1Filter = (reaction, user) =>
        reaction.emoji.name === "🇸" && user.id === message.author.id;
      let reaction2Filter = (reaction, user) =>
        reaction.emoji.name === "🇷" && user.id === message.author.id;
      let reaction3Filter = (reaction, user) =>
        reaction.emoji.name === "🇵" && user.id === message.author.id;
      let reaction1 = msg.createReactionCollector(reaction1Filter, {
        time: 12000
      });

      let reaction2 = msg.createReactionCollector(reaction2Filter, {
        time: 12000
      });
      let reaction3 = msg.createReactionCollector(reaction3Filter, {
        time: 12000
      });
      reaction1.on("collect", r => {
        message.channel.send(result);
      });
      reaction2.on("collect", r => {
        message.channel.send(result);
      });
      reaction3.on("collect", r => {
        message.channel.send(result);
      });
    });
  }
});

const cuttweets = [
  "كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟",
  "كت تويت | أكثر شيء يُسكِت الطفل برأيك؟",
  "كت تويت | الحرية لـ ... ؟",
  "كت تويت | قناة الكرتون المفضلة في طفولتك؟",
  "كت تويت ‏| كلمة للصُداع؟",
  "كت تويت ‏| ما الشيء الذي يُفارقك؟",
  "كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟",
  "كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟",
  "كت تويت | بعد ١٠ سنين ايش بتكون ؟",
  "كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟",
  "‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟",
  "كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟",
  "‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟",
  "‏كت تويت | وش يفسد الصداقة؟",
  "‏كت تويت | شخص لاترفض له طلبا ؟",
  "‏كت تويت | كم مره خسرت شخص تحبه؟.",
  "‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟",
  "‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟",
  "‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!",
  "‏كت تويت |أقوى كذبة مشت عليك ؟",
  "‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟",
  "كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟",
  "‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟",
  "‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟",
  "‏كت تويت | وش محتاج عشان تكون مبسوط ؟",
  "‏كت تويت | مطلبك الوحيد الحين ؟",
  "‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟",
  "اش رئيك بسيرفرنا"
];

client.on("message", async toxicc => {
  if (!toxicc.guild || toxicc.author.bot) return false;

  switch (toxicc.content.split(" ")[0]) {
    case prefix + "cut":
    case prefix + "كت":
      var embed = new Discord.RichEmbed()
        .setTitle("Cut Tweet")
        .setDescription(cuttweets[Math.floor(Math.random() * cuttweets.length)])
        .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
      toxicc.channel.send(embed);
      break;
  }
});

var viper = [
  "https://f.top4top.net/p_682it2tg6.png%22",
  "https://e.top4top.net/p_682a1cus5.png%22",
  "https://d.top4top.net/p_682pycol4.png%22",
  "https://c.top4top.net/p_682vqehy3.png%22",
  "https://b.top4top.net/p_682mlf9d2.png%22",
  "https://a.top4top.net/p_6827dule1.png%22",
  "https://b.top4top.net/p_682g1meb10.png%22",
  "https://a.top4top.net/p_682jgp4v9.png%22",
  "https://f.top4top.net/p_682d4joq8.png%22",
  "https://e.top4top.net/p_6828o0e47.png%22",
  "https://d.top4top.net/p_6824x7sy6.png%22",
  "https://c.top4top.net/p_682gzo2l5.png%22",
  "https://b.top4top.net/p_68295qg04.png%22",
  "https://a.top4top.net/p_682zrz6h3.png%22",
  "https://f.top4top.net/p_6828vkzc2.png%22",
  "https://e.top4top.net/p_682i8tb11.png"
];
client.on("message", message => {
  var args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "لوخيروك"))
    if (message.content.startsWith(prefix + "lo5")) {
      if (!message.channel.guild)
        return message.reply("** ممنوع كتابة الاوامر في خاص البوت**");
      var lo = new Discord.RichEmbed().setImage(
        viper[Math.floor(Math.random() * viper.length)]
      );
      .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
      message.channel.sendEmbed(lo);
    }
});

client.on("message", luxy => {
  if (luxy.author.bot) return;
  if (luxy.content === prefix + "help") {
    let embed = new Discord.RichEmbed()

      .setColor("GREEN")
      .setDescription(
        `**~~=~~ Bot Orders ~~=~~
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
> 🎮 - ${prefix}fkk

> 🎮 - ${prefix}rkb

> 🎮 - ${prefix}fast

> 🎮 - ${prefix}math

> 🎮 - ${prefix}puzzle

> 🎮 - ${prefix}xo

> 🎮 - ${prefix}rps

> 🎮 - ${prefix}points

> 🎮 - ${prefix}top

> 🎮 - ${prefix}cut

> 🎮 - ${prefix}lo5

> 🤖 - ${prefix}ping
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
**
`
      )
      .setFooter(`Niro Development`,`https://discord.gg/bMvtyJD`)
    luxy.channel.send({ embed: embed });
  }
});

client.on("ready", () => {
  console.log(`${client.user.tag}`);

  console.log(`${client.guilds.size} Servers`);

  console.log(`${client.users.size} Members`);

  console.log(`${client.channels.size} Channels`);

  console.log(`[ ${client.guilds.map(g => g.name).join(", \n ")} ]`);

  client.user.setActivity(
    `${prefix}help | ND`,
    { type: "playing" }
  );
});

client.login(process.env.token);
