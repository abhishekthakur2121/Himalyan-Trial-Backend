import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from '../models/Package.js';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://Abhi_111:Abhi111@cluster0.ulhadkb.mongodb.net/himalayan_trails';

const packages = [
  {
    title: 'Spiti Winter Odyssey',
    price: 15999,
    duration: '6D/5N',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Frozen Chandratal, starry night skies, and stark Spitian monasteries.',
    popular: true
  },
  {
    title: 'Classic Manali Adventure Escape',
    price: 11999,
    duration: '4D/3N',
    image: 'https://brozaadventures.com/soft/file_store/package/703071027CJ.jpg',
    shortDesc: 'Solang Valley snow play, Atal Tunnel drive, Old Manali cafes.',
    popular: true
  },
  {
    title: 'Shimla Heritage Retreat',
    price: 9999,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1608637017493-4603032c7a1b?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Mall Road charm, colonial architecture, and sunset viewpoints.',
    popular: false
  },
  {
    title: 'Dharamshala & McLeod Ganj Monastery Circuit',
    price: 11499,
    duration: '4D/3N',
    image: 'https://tse1.mm.bing.net/th/id/OIP.BBpZwDpJT4JsQ03P6VGRngHaFS?pid=Api&P=0&h=180',
    shortDesc: 'Dalai Lama temple, local Tibetan cafes, and Naddi sunset point.',
    popular: true
  },
  {
    title: 'Kasol – Parvati Riverside Getaway',
    price: 8999,
    duration: '3D/2N',
    image: 'https://tse2.mm.bing.net/th/id/OIP.85IiSYclvqugPKOejZW3aAHaEK?pid=Api&P=0&h=180',
    shortDesc: 'Riverside walks, Israeli food trail, and village homestays.',
    popular: true
  },
  {
    title: 'Bir Billing & Triund Adventure Combo',
    price: 12999,
    duration: '5D/4N',
    image: 'https://tse2.mm.bing.net/th/id/OIP.BhNpVNEuuBPUWGDbsJtrKQHaE8?pid=Api&P=0&h=180',
    shortDesc: 'World-class paragliding at Bir and a classic Triund ridge trek.',
    popular: true
  },
  {
    title: 'Tirthan Valley Trout & Trails',
    price: 11800,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1521207418485-99c705420785?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Riverside cottages, trout fishing, and Great Himalayan National Park walks.',
    popular: false
  },
  {
    title: 'Kheerganga Forest & Hot Springs Trek',
    price: 7999,
    duration: '3D/2N',
    image: 'https://tse4.mm.bing.net/th/id/OIP.KRE5he0kGFr6A0MEsh9fWAHaD_?pid=Api&P=0&h=180',
    shortDesc: 'Forest trek, campsite bonfire, and natural hot springs at the top.',
    popular: true
  },
  {
    title: 'Offbeat Jibhi & Jalori Pass Escape',
    price: 11200,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Wooden homestays, Jalori Pass viewpoint, and Serolsar Lake hike.',
    popular: false
  },
  {
    title: 'Chitkul – Last Village of India',
    price: 14500,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Baspa valley views, wooden houses, and starry-night bonfires.',
    popular: true
  },
  {
    title: 'Kinnaur Apple Orchard Homestay',
    price: 13250,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1515775538093-d2d95c79a393?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Stay inside working orchards with local Himachali meals.',
    popular: false
  },
  {
    title: 'Spiti Valley Road Trip via Kinnaur',
    price: 27999,
    duration: '9D/8N',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Kaza, Kibber, Langza, and the famous Spiti high-altitude loop.',
    popular: true
  },
  {
    title: 'Winter Snow Retreat in Manali & Solang',
    price: 13999,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1615554921435-5f5c72194a40?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Snow play, cable car views, and heated hotel stays.',
    popular: true
  },
  {
    title: 'Monsoon Greens of Tirthan & Jibhi',
    price: 12499,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Emerald forests, misty rivers, and quiet village lanes.',
    popular: false
  },
  {
    title: 'Dalhousie & Khajjiar Himalayan Meadows',
    price: 11999,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1515712486486-6f5641c04928?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Khajjiar meadows, pine forests, and colonial Dalhousie charm.',
    popular: false
  },
  {
    title: 'Weekend Shimla & Mashobra Hills',
    price: 9499,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1579504543281-1fe8f03bd287?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Cedar forests, cafe hopping, and quiet Mashobra trails.',
    popular: false
  },
  {
    title: 'Workation in Old Manali',
    price: 21500,
    duration: '10D/9N',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'High-speed Wi-Fi, mountain view stays, and cafe work corners.',
    popular: true
  },
  {
    title: 'Slow Travel in Bir & Barot Valley',
    price: 16499,
    duration: '6D/5N',
    image: 'https://images.unsplash.com/photo-1626243974379-a7b64a45c241?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Paragliding in Bir and riverside stays in Barot.',
    popular: false
  },
  {
    title: 'Himachal Backpacking Circuit',
    price: 22999,
    duration: '10D/9N',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Manali, Kasol, Dharamshala, Bir, and Shimla in one backpacking loop.',
    popular: true
  },
  {
    title: 'Family Friendly Shimla & Manali',
    price: 19999,
    duration: '6D/5N',
    image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Kid-friendly stays with gentle day trips and toy train ride.',
    popular: true
  },
  {
    title: 'Luxury Villa Retreat in Kasauli',
    price: 25999,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Private villa, bonfire evenings, and curated wine & cheese.',
    popular: false
  },
  {
    title: 'Chanshal Pass & Pabbar Valley Drive',
    price: 17250,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Less-explored ridges, apple belt villages, and winding drives.',
    popular: false
  },
  {
    title: 'Snow Leopard Inspired Spiti Winter Stay',
    price: 31500,
    duration: '8D/7N',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Remote homestays, wildlife trails, and white Spiti landscapes.',
    popular: true
  },
  {
    title: 'Triund & Kareri Lake Twin Trek',
    price: 14999,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Two classic weekend treks around Dharamshala in one go.',
    popular: true
  },
  {
    title: 'Parvati Valley Backpacker Trail',
    price: 15800,
    duration: '6D/5N',
    image: 'https://images.unsplash.com/photo-1465406325905-6cabbaf1a980?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Kasol, Chalal, Tosh, and local cafes with budget stays.',
    popular: true
  },
  {
    title: 'Kangra Valley Temple & Tea Trail',
    price: 11950,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Ancient temples, tea gardens, and valley viewpoints.',
    popular: false
  },
  {
    title: 'Sainj & Shangarh Meadows Stay',
    price: 13200,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Gharat (water mill) visits and meadow-side cottages.',
    popular: false
  },
  {
    title: 'Hatu Peak & Narkanda Weekend Drive',
    price: 9750,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Cedar forests, apple orchards, and Hatu temple views.',
    popular: false
  },
  {
    title: 'Romantic Manali Snow & Spa Escape',
    price: 21499,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Couple-friendly stays, spa session, and private cab sightseeing.',
    popular: true
  },
  {
    title: 'Spiti Self-Drive Convoy (Guided)',
    price: 33999,
    duration: '8D/7N',
    image: 'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Drive your own SUV in a guided convoy through Spiti.',
    popular: true
  },
  {
    title: 'Shimla, Kufri & Chail Family Escape',
    price: 15499,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1545243424-0ce743321e11?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Toy train ride, Kufri fun world, and quiet Chail nights.',
    popular: false
  },
  {
    title: 'Kasol Weekend Music & Cafes',
    price: 8499,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Live music cafes, riverside walks, and bonfire nights.',
    popular: true
  },
  {
    title: 'Dharamkot Yoga & Cafe Workation',
    price: 23500,
    duration: '10D/9N',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Morning yoga, mountain-view workspaces, and quiet cafes.',
    popular: true
  },
  {
    title: 'Basics of Mountaineering – Himachal Edition',
    price: 28999,
    duration: '9D/8N',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Intro course with certified instructors and glacier walks.',
    popular: false
  },
  {
    title: 'Winter Workation in Tirthan Valley',
    price: 24500,
    duration: '12D/11N',
    image: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Riverside Wi-Fi cabins with bonfire evenings and hikes.',
    popular: false
  },
  {
    title: 'Himachal Honeymoon Special',
    price: 27999,
    duration: '7D/6N',
    image: 'https://images.unsplash.com/photo-1523906630133-f6934a1ab1b4?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Decorated rooms, candlelight dinners, and private sightseeing.',
    popular: true
  },
  {
    title: 'Backpacking Spiti on a Budget',
    price: 21999,
    duration: '8D/7N',
    image: 'https://images.unsplash.com/photo-1526481280695-3c687fd543c0?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Hostel stays and public-transport-friendly Spiti loop.',
    popular: true
  },
  {
    title: 'Churdhar Peak Trek Adventure',
    price: 10800,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Summit trek with temple visit and campsite under stars.',
    popular: false
  },
  {
    title: 'Pin Parvati Pass Expedition (Advanced)',
    price: 44999,
    duration: '11D/10N',
    image: 'https://images.unsplash.com/photo-1508261306211-45a1c5c2a5c5?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'For seasoned trekkers seeking a serious high-altitude challenge.',
    popular: false
  },
  {
    title: 'Weekend Camping at Prashar Lake',
    price: 7999,
    duration: '2D/1N',
    image: 'https://images.unsplash.com/photo-1598618454522-5540baad2db3?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Hilltop lake camping with bonfire and starry sky views.',
    popular: true
  },
  {
    title: 'Snowy New Year in Himachal',
    price: 24999,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1513639725746-c5d3e861f32a?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Curated New Year celebration with DJ night and bonfire.',
    popular: true
  },
  {
    title: 'Luxury Resort Stay in Mashobra',
    price: 29999,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Spa, infinity views, and fine dining in the cedar forests.',
    popular: false
  },
  {
    title: 'Manali to Leh Highway Taster (Up to Sarchu)',
    price: 25999,
    duration: '6D/5N',
    image: 'https://images.unsplash.com/photo-1500534312687-48aab01c77d4?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Iconic Manali–Leh highway segments without going to Leh.',
    popular: false
  },
  {
    title: 'Chamba & Bharmour Temple Trail',
    price: 14300,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1601758260944-72f34c8e2623?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Ancient temples, village homestays, and Ravi river views.',
    popular: false
  },
  {
    title: 'Short Himachal Highlights (Shimla & Manali)',
    price: 17499,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Perfect first-timer circuit covering both Shimla and Manali.',
    popular: true
  },
  {
    title: 'Palampur Tea Gardens & Andretta Art',
    price: 11850,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1477586957327-847a0f3f4fe3?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Tea estate walks and pottery village visits.',
    popular: false
  },
  {
    title: 'Kaza, Hikkim, and World’s Highest Post Office',
    price: 23999,
    duration: '7D/6N',
    image: 'https://images.unsplash.com/photo-1526481280692-3b113b1df4a0?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Highlight-focused Spiti trip for postcard lovers.',
    popular: true
  },
  {
    title: 'Dhauladhar Weekend Trek Sampler',
    price: 9999,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Gentle introductory trek around Dharamshala.',
    popular: false
  },
  {
    title: 'Slow Homestay Trail in Kullu Villages',
    price: 15899,
    duration: '6D/5N',
    image: 'https://images.unsplash.com/photo-1523419409543-3e4f83b9b4c9?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Stay with local families, orchard walks, and village life.',
    popular: false
  },
  {
    title: 'Photography-Focused Spiti Expedition',
    price: 32999,
    duration: '8D/7N',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Golden-hour shoots at monasteries and high villages.',
    popular: true
  },
  {
    title: 'Kasol & Grahan Village Trek',
    price: 11250,
    duration: '4D/3N',
    image: 'https://images.unsplash.com/photo-1508261306211-45a1c5c2a5c5?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Forest trail to Grahan with simple village homestay.',
    popular: false
  },
  {
    title: 'Triund Weekend Camping Under the Stars',
    price: 8999,
    duration: '2D/1N',
    image: 'https://images.unsplash.com/photo-1519817650390-64a93db511aa?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Short hike with overnight camping and sunrise views.',
    popular: true
  },
  {
    title: 'Luxury Snow Chalet in Hamta Valley',
    price: 28999,
    duration: '5D/4N',
    image: 'https://images.unsplash.com/photo-1607198179219-9b84908be0a4?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Boutique chalet stay with guided snow activities.',
    popular: true
  },
  {
    title: 'Dharamshala Weekend Cricket & Cafes',
    price: 9750,
    duration: '3D/2N',
    image: 'https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'HPCA stadium visit, Bhagsu waterfall, and sunset cafes.',
    popular: false
  },
  {
    title: 'Spiti with Pin Valley & Mud Village',
    price: 28999,
    duration: '9D/8N',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1600&auto=format&fit=crop',
    shortDesc: 'Add the lush Pin valley and Mud village to your Spiti loop.',
    popular: true
  }
];

const testimonials = [
  { name: 'Vansh Suri', location: 'Mumbai, IN', rating: 5, comment: 'Flawless planning and stunning views. Highly recommended!', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Sara Thompson', location: 'London, UK', rating: 5, comment: 'Loved the Spiti drive and cozy homestays.', avatar: 'https://i.pravatar.cc/150?img=32' },
  { name: 'Kabir Singh', location: 'Delhi, IN', rating: 5, comment: 'Dharamshala vibes were unreal. Great hosts.', avatar: 'https://i.pravatar.cc/150?img=5' },
  { name: 'Meera Iyer', location: 'Bengaluru, IN', rating: 5, comment: 'Super professional and friendly team.', avatar: 'https://i.pravatar.cc/150?img=24' },
  { name: 'Noah Williams', location: 'Toronto, CA', rating: 5, comment: 'Paragliding at Bir was a dream come true.', avatar: 'https://i.pravatar.cc/150?img=47' },
  { name: 'Apurav Uppal', location: 'Hyderabad, IN', rating: 5, comment: 'Quick responses and safe travel. Perfect!', avatar: 'https://i.pravatar.cc/150?img=15' },
  { name: 'Lucas Martin', location: 'Paris, FR', rating: 5, comment: 'Food, culture, mountains. Fantastic mix.', avatar: 'https://i.pravatar.cc/150?img=61' },
  { name: 'Ananya Verma', location: 'Pune, IN', rating: 5, comment: 'Our Shimla retreat was peaceful and scenic.', avatar: 'https://i.pravatar.cc/150?img=8' }
];

async function run() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding');
    await Package.deleteMany({});
    await Testimonial.deleteMany({});
    await Package.insertMany(packages);
    await Testimonial.insertMany(testimonials);
    console.log('Seeding completed successfully');
  } catch (err) {
    console.error('Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
  }
}

run();
