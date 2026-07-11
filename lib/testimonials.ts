export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Tandy's came and serviced our windows today and they couldn't have turned out better. We've had the house for 3 years and hadn't really touched them much... When Tandy's was done the windows looked like new again! Good group of guys!",
    name: "Devon Rosson",
    meta: "Local Guide · Google review",
  },
  {
    quote:
      "Tandys Window Service was a great experience. They showed up on time, staff was professional and they did an excellent job. Highly recommend them.",
    name: "Kristi Fox",
    meta: "Google review",
  },
  {
    quote:
      "I am so pleased with Tandy's Window Services! This was my first experience with this company and I will definitely be a regular customer! Loren and his team were so thorough and professional.",
    name: "Maureen Doss",
    meta: "Local Guide · Google review",
  },
];

export const businessStats = {
  rating: 5.0,
  reviewCount: 43,
  serviceCount: 8,
};
