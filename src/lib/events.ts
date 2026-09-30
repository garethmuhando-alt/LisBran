// Illustrative examples of the kinds of events LisBran suppliers work.
// Not affiliated with any organiser; supplier needs are typical, not confirmed.
export type EventItem = {
  id: number;
  name: string;
  city: string;
  venue: string;
  month: string;
  size: string;
  type: string;
  need: string[];
  lat: number;
  lng: number;
};

export const events: EventItem[] = [
  { id: 1, name: "Tech week at KICC", city: "Nairobi", venue: "KICC", month: "April", size: "5,000+", type: "Corporate", need: ["Brand ambassadors", "Badge and banner printing"], lat: -1.2887, lng: 36.8233 },
  { id: 2, name: "Open-air music festival", city: "Nairobi", venue: "Ngong Road", month: "May", size: "10,000+", type: "Festival", need: ["Event photographers", "Sampling crews"], lat: -1.3002, lng: 36.7806 },
  { id: 3, name: "Coastal trade expo", city: "Mombasa", venue: "Showground", month: "July", size: "5,000+", type: "Trade", need: ["Stand printing", "Promoters"], lat: -4.0435, lng: 39.6682 },
  { id: 4, name: "Lake region business summit", city: "Kisumu", venue: "City centre", month: "July", size: "1,200+", type: "Business", need: ["Stage branding", "Photography"], lat: -0.1022, lng: 34.7617 },
  { id: 5, name: "Agri-business show", city: "Nakuru", venue: "ASK Showground", month: "July", size: "4,000+", type: "Agriculture", need: ["Branded tents", "Sampling crews"], lat: -0.3031, lng: 36.08 },
  { id: 6, name: "Motorsport VIP village", city: "Naivasha", venue: "Lakeside", month: "June", size: "20,000+", type: "Sports", need: ["Influencers", "VIP area branding"], lat: -0.7167, lng: 36.4333 },
  { id: 7, name: "Entrepreneur expo", city: "Nairobi", venue: "Sarit Expo Centre", month: "July", size: "3,500+", type: "Business", need: ["Flyer distribution", "Promo video"], lat: -1.2615, lng: 36.8029 },
  { id: 8, name: "Coastal culture festival", city: "Malindi", venue: "Old town", month: "August", size: "1,500+", type: "Culture", need: ["Photographers", "Dancers"], lat: -3.2138, lng: 40.1169 },
];

export const cityCoords: Record<string, { lat: number; lng: number }> = {
  Nairobi: { lat: -1.2864, lng: 36.8172 },
  Mombasa: { lat: -4.0435, lng: 39.6682 },
  Kisumu: { lat: -0.1022, lng: 34.7617 },
  Nakuru: { lat: -0.3031, lng: 36.08 },
  Kiambu: { lat: -1.1714, lng: 36.8356 },
};
