// Question bank. Each game picks QUESTIONS_PER_GAME of these at random.
// `answer` is the index (0-3) of the correct choice.
const QUESTION_BANK = [
    {
        anime: 'One Piece',
        question: 'Who gave Luffy his straw hat?',
        choices: ['Shanks', 'Mihawk', 'Zoro', 'Garp'],
        answer: 0,
    },
    {
        anime: 'One Piece',
        question: 'Which Devil Fruit did Luffy eat, as it was first known?',
        choices: ['Mera Mera no Mi', 'Gomu Gomu no Mi', 'Bara Bara no Mi', 'Hie Hie no Mi'],
        answer: 1,
    },
    {
        anime: 'One Piece',
        question: 'What is the name of Zoro\'s fighting style?',
        choices: ['One-Sword Style', 'Two-Sword Style', 'Three-Sword Style', 'Nine-Sword Style'],
        answer: 2,
    },
    {
        anime: 'Naruto',
        question: 'Which jutsu does Naruto use to create copies of himself?',
        choices: ['Rasengan', 'Chidori', 'Fireball Jutsu', 'Shadow Clone Jutsu'],
        answer: 3,
    },
    {
        anime: 'Naruto',
        question: 'Which tailed beast is sealed inside Naruto?',
        choices: ['Shukaku', 'Kurama', 'Gyuki', 'Matatabi'],
        answer: 1,
    },
    {
        anime: 'Demon Slayer',
        question: 'What is the name of Tanjiro\'s sister?',
        choices: ['Kanao', 'Shinobu', 'Nezuko', 'Mitsuri'],
        answer: 2,
    },
    {
        anime: 'Demon Slayer',
        question: 'Which breathing style does Tanjiro first learn from Urokodaki?',
        choices: ['Water Breathing', 'Flame Breathing', 'Thunder Breathing', 'Beast Breathing'],
        answer: 0,
    },
    {
        anime: 'Attack on Titan',
        question: 'Which of the three walls is the outermost?',
        choices: ['Wall Rose', 'Wall Sina', 'Wall Shiganshina', 'Wall Maria'],
        answer: 3,
    },
    {
        anime: 'Attack on Titan',
        question: 'What is the name of Eren\'s adoptive sister?',
        choices: ['Annie', 'Mikasa', 'Historia', 'Sasha'],
        answer: 1,
    },
    {
        anime: 'Death Note',
        question: 'Which Shinigami drops the Death Note that Light finds?',
        choices: ['Rem', 'Sidoh', 'Ryuk', 'Gelus'],
        answer: 2,
    },
    {
        anime: 'Dragon Ball',
        question: 'What is Goku\'s Saiyan birth name?',
        choices: ['Kakarot', 'Raditz', 'Bardock', 'Broly'],
        answer: 0,
    },
    {
        anime: 'Dragon Ball',
        question: 'How many Dragon Balls are needed to summon Shenron?',
        choices: ['5', '6', '7', '9'],
        answer: 2,
    },
    {
        anime: 'My Hero Academia',
        question: 'What is the name of the Quirk All Might passes to Deku?',
        choices: ['All For One', 'One For All', 'Explosion', 'Half-Cold Half-Hot'],
        answer: 1,
    },
    {
        anime: 'Jujutsu Kaisen',
        question: 'Whose finger does Yuji Itadori swallow?',
        choices: ['Mahito', 'Satoru Gojo', 'Jogo', 'Ryomen Sukuna'],
        answer: 3,
    },
    {
        anime: 'Fullmetal Alchemist',
        question: 'Which principle is all alchemy based on?',
        choices: ['Equivalent Exchange', 'The Gate of Truth', 'The Philosopher\'s Stone', 'Human Transmutation'],
        answer: 0,
    },
    {
        anime: 'Hunter x Hunter',
        question: 'Which family does Gon\'s best friend Killua come from?',
        choices: ['Kurta', 'Zoldyck', 'Freecss', 'Netero'],
        answer: 1,
    },
    {
        anime: 'Spirited Away',
        question: 'What is the name of the girl in Spirited Away?',
        choices: ['Kiki', 'Sophie', 'Satsuki', 'Chihiro'],
        answer: 3,
    },
    {
        anime: 'Studio Ghibli',
        question: 'Which studio made Spirited Away?',
        choices: ['Toei Animation', 'MAPPA', 'Studio Ghibli', 'Madhouse'],
        answer: 2,
    },
    {
        anime: 'Sailor Moon',
        question: 'What is Sailor Moon\'s real name?',
        choices: ['Usagi Tsukino', 'Ami Mizuno', 'Rei Hino', 'Makoto Kino'],
        answer: 0,
    },
    {
        anime: 'Pokémon',
        question: 'Which Pokémon was Ash\'s first partner?',
        choices: ['Charmander', 'Pikachu', 'Squirtle', 'Bulbasaur'],
        answer: 1,
    },
];
