
import { Person } from '@/types/connections';
import { Connection } from '@/types/thought-leaders';

// Define a conversion function to transform Connection to Person type
export const connectionToPerson = (connection: Connection): Person => ({
  id: connection.id,
  name: connection.name,
  role: connection.role,
  category: connection.category as any, // Type cast needed here
  image: connection.image_url || undefined,
  special: connection.special || false,
  relationship: connection.bio || undefined,
  socialLinks: connection.socialLinks?.map(link => ({
    platform: link.platform as any,
    url: link.url
  }))
});

// Default people data
export const defaultPeople: Person[] = [
  {
    id: "sam-altman",
    name: "Sam Altman",
    role: "CEO of OpenAI",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/804990434455887872/BG0Xh7Oa_400x400.jpg",
    relationship: "Sam's vision for AI and humanity's future is unparalleled."
  },
  {
    id: "marc-andreessen",
    name: "Marc Andreessen",
    role: "Co-founder of a16z",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1369435367/ma-twitter-4_400x400.jpg",
    relationship: "Marc's thinking on technology and progress has deeply influenced me."
  },
  {
    id: "paul-graham",
    name: "Paul Graham",
    role: "Co-founder of Y Combinator",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1824002576/pg-railsconf_400x400.jpg"
  },
  {
    id: "balaji-srinivasan",
    name: "Balaji Srinivasan",
    role: "Angel Investor & Entrepreneur",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1609979110158299137/63gWQeMQ_400x400.jpg",
    special: true
  },
  {
    id: "vitalik-buterin",
    name: "Vitalik Buterin",
    role: "Creator of Ethereum",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/977496875887558661/L86xyLF4_400x400.jpg"
  },
  {
    id: "naval-ravikant",
    name: "Naval Ravikant",
    role: "AngelList Co-founder",
    category: "business",
    image: "/lovable-uploads/1f2c23f2-c00c-42dd-9f76-d8562ba0550c.png", // Updated Naval's image with the provided picture
    special: true,
    relationship: "Naval's insights on wealth creation and happiness have changed my perspective."
  },
  {
    id: "patrick-collison",
    name: "Patrick Collison",
    role: "CEO of Stripe",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1320076285169917952/zQUrdqxK_400x400.jpg"
  },
  {
    id: "andrew-yang",
    name: "Andrew Yang",
    role: "Forward Party Founder",
    category: "politics",
    image: "https://pbs.twimg.com/profile_images/1250921081460633602/QvBD597y_400x400.jpg"
  },
  {
    id: "elon-musk",
    name: "Elon Musk",
    role: "CEO of Tesla, SpaceX, X",
    category: "business",
    image: "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg",
    special: true,
    relationship: "Elon's ambition and execution ability are truly inspiring."
  },
  {
    id: "peter-thiel",
    name: "Peter Thiel",
    role: "Founder of Palantir",
    category: "business",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Peter_Thiel_by_Gage_Skidmore.jpg"
  },
  {
    id: "jordan-peterson",
    name: "Jordan Peterson",
    role: "Psychologist & Author",
    category: "learning",
    image: "https://pbs.twimg.com/profile_images/1602752936935124993/s_jgHEu3_400x400.jpg"
  },
  {
    id: "lex-fridman",
    name: "Lex Fridman",
    role: "AI Researcher & Podcaster",
    category: "learning",
    image: "https://pbs.twimg.com/profile_images/1475597165051080705/0gLU-JUK_400x400.jpg",
    relationship: "Lex's thoughtful conversations have expanded my understanding of AI and humanity."
  },
  {
    id: "patrick-mcdavid",
    name: "Patrick McDavid",
    role: "Entrepreneur & Tech Innovator",
    category: "business",
    image: "/lovable-uploads/ba77db19-a5a2-49c5-87cf-85f690643d20.png", // Updated to use the newly uploaded image
    relationship: "Patrick's innovative approach to technology and business strategies is remarkable."
  },
  {
    id: "foram",
    name: "FORAM",
    role: "Strategic Advisor & Business Consultant",
    category: "business",
    image: "https://randomuser.me/api/portraits/women/28.jpg", // Placeholder image
    special: true,
    relationship: "FORAM's strategic insights and analytical approach to problem-solving have been invaluable."
  }
];
