const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://miami-ga.glitch.me/`);
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

const prefix = process.env.prefix; //البريفكس أو امر التشغيل

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

//////
///////////////

////كود الفيف اوي
const Enmap = require("enmap");
const cd = require("countdown");
const totime = require("to-time");
const dbg = new Enmap({ name: "Giveaway" });

//////////////////S

/////////////////
//gstart
client.on("ready", async () => {
  await dbg.defer;
  await console.log(`Logged in as [ ${client.user.username} ]!`);
  client.guilds.forEach(async g => {
    g.channels
      .filter(
        c =>
          c.type == "text" &&
          c.permissionsFor(client.user.id).has("VIEW_CHANNEL")
      )
      .forEach(async c => {
        let fetched = await c.fetchMessages();
        if (fetched.size == 0) return;
        let mess = await fetched.filter(
          r =>
            r.author.id === client.user.id && r.content == `**🎉 GIVEAWAY 🎉**`
        );
        if (mess.size == 0) return;
        mess.forEach(m => {
          if (!m) return;
          if (!dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`)) return;
          let time2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtime;
          let text2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gtext;
          let win2 = dbg.get(`giveaway.${g.id}.${c.id}.${m.id}.time`).gwin;
          if (time2 === null || time2 === undefined) return;
          let embed = new RichEmbed()
            .setColor("BLUE")
            .setAuthor(`${text2}`, g.iconURL)
            .setDescription(
              `React with 🎉 to enter!\nTime remaining: ${cd(
                new Date().getTime(),
                time2
              )}`
            )
            .setFooter(`Ends at`, client.user.avatarURL)
            .setTimestamp(time2);
          let embed2 = new RichEmbed()
            .setColor("RED")
            .setAuthor(text2, g.iconURL)
            .setFooter(`Ended at`);
          let ttimer = setInterval(async () => {
            if (!m || m.content == `🎉 **GIVEAWAY ENDED** 🎉`) return;
            let ttt = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10];
            if (ttt.includes(moment().diff(time2, "seconds")))
              return m.edit(
                `🎉 **GIVEAWAY** 🎉`,
                embed
                  .setColor("#ffb800")
                  .setDescription(
                    `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                      new Date().getTime(),
                      time2
                    )}`
                  )
              );
            m.edit(
              `🎉 **GIVEAWAY** 🎉`,
              embed.setDescription(
                `React with 🎉 to enter!\nTime remaining: ${cd(
                  new Date().getTime(),
                  time2
                )}`
              )
            );
            if (moment().isAfter(time2)) {
              m.reactions
                .filter(a => a.emoji.name == "🎉")
                .map(r =>
                  r.fetchUsers().then(u => {
                    let rusers = u
                      .filter(user => !user.bot)
                      .random(parseInt(win2));
                    m.edit(
                      `${g} GIVEAWAY ENDED ${g}`,
                      embed2
                        .setTimestamp()
                        .setDescription(`Winners:\n${rusers || "No winners"}`)
                    );
                    if (
                      m.reactions
                        .filter(a => a.emoji.name == "🎉")
                        .map(reaction => reaction.count)[0] <= 1
                    ) {
                      return m.channel.send(`No winners :rolling_eyes:`);
                    } else {
                      m.channel.send(
                        `Congratulations ${rusers}! You won the **${text2}**`
                      );
                    }
                    dbg.delete(`giveaway.${g.id}.${c.id}.${m.id}.time`);
                    clearInterval(ttimer);
                    return;
                  })
                );
            }
          }, 5000);
        });
      });
  });
});
//client.on('error', console.error);
//client.on('warn', warn => console.warn(`[WARN] - ${warn}`));
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
});

client.on("message", async message => {
  //let g = client.guilds
  //  .get("606910399811420175")
  //    .emojis.find(r => r.name === "start");
  if (message.author.bot || message.channel.type == "dm") return undefined;
  let args = message.content.split(" ");
  let timer;
  if (args[0] == `${prefix}start`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1] || !args[2] || !args[3])
        return message.channel.send(
          `**Usage:** **\`${prefix}start [Time] [Winners] [Giveaway Prize]\n\`** **Example:** **\`${prefix}start 4h 1 Nitro\`**`
        );
      if (!message.guild.member(client.user).hasPermission("EMBED_LINKS"))
        return message.channel.send(`I don't have **Embed Links** permission.`);
      if (ms(args[1]) === undefined)
        return message.channel.send(`Please use a proper time format.`);
      if (isNaN(args[2]))
        return message.channel.send(`Winners must be number!`);
      if (args[2] < 1 || args[2] > 10)
        return message.channel.send(`Winners must be bettwen 1 and 10.`);
      let timega = ms(args[1]) / 1000;
      let time = Date.now() + totime.fromSeconds(timega).ms();
      if (timega < 5)
        return message.channel.send(
          `Giveaway time can't be less than 5 seconds.`
        );
      let timespan = cd(new Date().getTime(), time);
      let rusers;
      let embed = new RichEmbed()
        .setColor("BLUE")
        .setAuthor(`${args.slice(3).join(" ")}`)
        .setDescription(`React with 🎉 to enter!\nTime remaining: ${timespan}`)
        .setFooter(`Ends at`, client.user.avatarURL)
        .setTimestamp(time);
      let embed2 = new RichEmbed()
        .setColor("RED")
        .setAuthor(args.slice(3).join(" "))
        .setFooter(`Ended at`);
      let msg = await message.channel
        .send(`**🎉 GIVEAWAY 🎉**`, embed)
        .catch(err => message.channel.send(`Error: \`${err}\``));
      dbg.set(
        `giveaway.${message.guild.id}.${message.channel.id}.${msg.id}.time`,
        {
          gtime: time,
          gid: msg.id,
          gtext: args.slice(3).join(" "),
          gwin: args[2]
        }
      );
      await msg.react("🎉");
      timer = setInterval(() => {
        if (!msg || msg.content == `**🎉 GIVEAWAY ENDED 🎉**`) return;
        let ttt = [-2, -3, -4, -5, -6, -7, -8, -9, -10];
        if (ttt.includes(moment().diff(time, "seconds")))
          return msg.edit(
            `**🎉 GIVEAWAY 🎉**`,
            embed
              .setColor("#ffb800")
              .setDescription(
                `**Last chance to enter!!!**\nReact with 🎉\nTime remaining: ${cd(
                  new Date().getTime(),
                  time
                )}`
              )
          );
        msg.edit(
          `**🎉 GIVEAWAY 🎉**`,
          embed.setDescription(
            `React with 🎉 to enter!\nTime remaining: ${cd(
              new Date().getTime(),
              time
            )}`
          )
        );
        rusers = msg.reactions
          .filter(a => a.emoji.name == "🎉")
          .map(reaction =>
            reaction.users.filter(u => !u.bot).random(parseInt(args[2]))
          )[0];
        if (moment().isAfter(time)) {
          msg.edit(
            `** GIVEAWAY ENDED 🎉**`,
            embed2
              .setTimestamp()
              .setDescription(`Winners:\n${rusers || "No winners"}`)
          );
          if (
            msg.reactions
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          ) {
            return message.channel.send(``);
          } else {
            msg.channel.send(
              `Congratulations ${rusers}! You won the **${args
                .slice(3)
                .join(" ")}**`
            );
          }
          clearInterval(timer);
          return;
        }
      }, 5000);
    } else return undefined;
  } else if (args[0] == `${prefix}groll`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}groll [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .fetchMessage(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(`This is not a giveaway message.`);
          if (!m.content.startsWith(`**🎉 GIVEAWAY**`))
            return message.channel.send(`This is not a giveaway message.`);
          if (m.content != `**🎉 GIVEAWAY ENDED 🎉**`)
            return message.channel.send(`The giveaway is not ended.`);
          if (m.reactions.size < 1)
            return message.channel.send(
              `I can't find reactions in this message.`
            );
          if (
            m.reactions
              .filter(a => a.emoji.name == "🎉")
              .map(reaction => reaction.count)[0] <= 1
          )
            return message.channel.send(``);
          m.reactions
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.fetchUsers().then(async u => {
                let rusers = u.filter(user => !user.bot).random();
                await message.channel.send(`The new winner is: ${rusers}`);
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
  } else if (args[0] == `${prefix}gend`) {
    if (
      message.member.hasPermission("MANAGE_GUILD") ||
      message.member.roles.find(r => r.name == "GIVEAWAYS")
    ) {
      if (!args[1])
        return message.channel.send(
          `**Usage:** **\`${prefix}gend [giveaway message id]\`**`
        );
      if (isNaN(args[1])) return message.channel.send(`Thats not a message ID`);
      message.channel
        .fetchMessage(args[1])
        .then(async m => {
          if (m.author.id != client.user.id)
            return message.channel.send(`This is not a giveaway message.`);
          if (!m.content.startsWith(`**🎉 GIVEAWAY**`))
            return message.channel.send(`This is not a giveaway message.`);
          if (m.content == `**🎉 GIVEAWAY ENDED 🎉**`)
            return message.channel.send(`The giveaway is ended.`);
          if (m.reactions.size < 1)
            return message.channel.send(
              `I can't find reactions in this message.`
            );
          let gv = dbg.get(
            `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
          );
          let rusers = m.reactions.map(r =>
            r.users.filter(u => !u.bot).random(parseInt(gv.gwin))
          );
          let embed2 = new RichEmbed()
            .setColor("RED")
            .setAuthor(gv.gtext)
            .setFooter(`Ended at`);
          m.reactions
            .filter(a => a.emoji.name == "🎉")
            .map(r =>
              r.fetchUsers().then(async u => {
                let rusers = u
                  .filter(user => !user.bot)
                  .random(parseInt(gv.gwin));
                m.edit(
                  `**🎉 GIVEAWAY ENDED 🎉**`,
                  embed2
                    .setTimestamp()
                    .setDescription(`Winners:\n${rusers || "No winners"}`)
                );
                if (
                  m.reactions
                    .filter(a => a.emoji.name == "🎉")
                    .map(reaction => reaction.count)[0] <= 1
                ) {
                  return message.channel.send(`No winners :rolling_eyes:`);
                } else {
                  message.channel.send(
                    `Congratulations ${rusers}! You won the **${gv.gtext}**`
                  );
                }
                await dbg.delete(
                  `giveaway.${message.guild.id}.${message.channel.id}.${m.id}.time`
                );
                return;
              })
            );
        })
        .catch(err =>
          message.channel.send(`I can't find this message in the channel.`)
        );
    } else return undefined;
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
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x:لم يتمكن احد من حل اللغز `
            );
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
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: لم يتمكن احد من تركيب الكلمة`
            );
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
            message.channel.send(embed);
            console.log(`[Typing] ${collected.first().author} typed the word.`);
            let won = collected.first().author;
            points[won.id].points++;
          })
          .catch(collected => {
            var embed1 = new Discord.RichEmbed().setDescription(
              `:x: **لم يتمكن احد من حل معادله في الوقت المناسب**`
            );
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
        .setFooter(toxicc.author.tag, toxicc.author.displayAvatarURL);
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
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
> 🤖 - ${prefix}ping
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
> 🎉 - ${prefix}start

> 🎉 - ${prefix}gend

> 🎉 - ${prefix}groll
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
> 🎶 - ${prefix}play

> 🎶 - ${prefix}nowplaying

> 🎶 - ${prefix}pause

> 🎶 - ${prefix}queue

> 🎶 - ${prefix}resume

> 🎶 - ${prefix}skip

> 🎶 - ${prefix}stop

> 🎶 - ${prefix}volume
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
**
`
      )
      .setFooter("NIRO Development");
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
    `${prefix}help | Miami : https://discord.gg/9kDUkDE`,
    { type: "playing" }
  );
});

client.login(process.env.token);
