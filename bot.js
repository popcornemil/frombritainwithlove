var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

function toGmd(divisor){
    var today = new Date();
    var gmd = new Date(2019,11,29);

    return Math.round((gmd - today)/(divisor));
}

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'hello-world':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello World!'
                });
            case 'marclegend':
                bot.sendMessage({
                    to: channelID,
                    message: 'marclegend=true'
                });
            case 'GeMigGmd':
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                bot.sendMessage({
                    to: channelID,
                    message: 'Det är ' + toGmd(oneDay) + " dagar tills GMD 2019!"
                });
            break;
            case 'GeMigGmdTimmar':
                var oneHour = 60*60*1000; // minutes*seconds*milliseconds
                bot.sendMessage({
                    to: channelID,
                    message: 'Det är ' + toGmd(oneHour) + " timmar tills GMD 2019!"
                });
            break;
            case 'GeMigGmdMinuter':
                var oneMinute = 60*1000; // seconds*milliseconds
                bot.sendMessage({
                    to: channelID,
                    message: 'Det är ' + toGmd(oneMinute) + " minuter tills GMD 2019!"
                });
            break;
            case 'VaLiteSkön':
                var quotes = [
                    "Jag kan tänka mig donera blod till skräckfilmer. - Joel G 9E",
                    "Kolla killar, en albinobjörn! - Misse Nyman,",
                    "Varför har inte jag fått smaka Malibun? - Besten",
                    "Det löser sig snart. - Kemisten",
                    "Det går lite hand i hand. - Dibs"
                    "Nästan.. - Okänd"
                ]
                    
                var quote = quotes[Math.floor(Math.random() * quotes.length)];
                bot.sendMessage({
                    to: channelID,
                    message: quote
                });
            break;
            case 'hilfe':
                bot.sendMessage({
                    to: channelID,
                    message: "Available commands are: [!GeMigGmdMinuter, !GeMigGmdTimmar, !GeMigGmd, !marclegend, !hello-world, !VaLiteSkön]"
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
