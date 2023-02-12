const token = '6020377695:AAF1xApMpAcz9my3-U7wLY4QD4G1RtdFejE'
const TelegramApi = require('node-telegram-bot-api')
const bot = new TelegramApi(token, {polling: true})
const chats = {}
const {gameOptions,againOptions} = require('./options')
const startGame = async (chatId) =>{
    await bot.sendMessage(chatId,`угадай цифру от 1 до 9`)
    const randomNumber = Math.floor(Math.random()*10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId,`летс го`, gameOptions)
}
const start = () =>{
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id
        if(text === '/start'){
           await bot.sendAnimation(chatId,'https://tlgrm.eu/_/stickers/524/c46/524c462c-690d-3f05-ae42-4183400e0a7c/5.webp')
           return bot.sendMessage(chatId,`Привет,сынку`)
        }
        if(text === '/what'){
           return bot.sendMessage(chatId,`Это мой первый бот, он написан на Node, сильно от него ничего не требуй,у него лапки))))`)
        }
        if(text === '/info'){
            return bot.sendMessage(chatId,`Тебя звать ${msg.from.first_name} AK ${msg.from.last_name}`)
        }
        if(text === '/game'){
            return startGame(chatId);
        }
   
          return bot.sendMessage(chatId,`я тебя не понимаю, другалЁк`)
    
    })
    bot.setMyCommands([
        {command: '/start', description: 'пиривет'},
        {command: '/what', description: 'что это '},
        {command: '/info', description: 'хто я?'},
        {command: '/game', description: 'играть в самую скучную игру?'},
    ])
}

bot.on("callback_query", async msg =>  {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if(data === '/again'){
        return startGame(chatId);
    }
    if (data == chats[chatId]){
        return  bot.sendMessage(chatId, `везучий клещ, как ты угадал? Реально же ${ chats[chatId]}`,againOptions)
    } else {
        return  bot.sendMessage(chatId, `трай эген , бот загадал ${chats[chatId]}`,againOptions)
    }
})

start()