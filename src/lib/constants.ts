import { MenuProduct } from "@/types";

export const categories = [
	{
		name: "Kids Corner",
		href: "#kids-corner",
	},
	{
		name: "Beef",
		href: "#beef",
	},
	{
		name: "Pork",
		href: "#pork",
	},
	{
		name: "Chicken",
		href: "#chicken",
	},
	{
		name: "Fish",
		href: "#fish",
	},
	{
		name: "Seafood",
		href: "#seafood",
	},
	{
		name: "Desserts",
		href: "#desserts",
	},
	{
		name: "Drinks",
		href: "#drinks",
	},
	{
		name: "Others",
		href: "#others",
	},
	{
		name: "Beverages",
		href: "#beverages",
	},
	{
		name: "Soups",
		href: "#soups",
	},
	{
		name: "Fast Food",
		href: "#fastfood",
	},
	{
		name: "Italian",
		href: "#italian",
	},
	{
		name: "Cusine",
		href: "#cusine",
	},
	{
		name: "Pizza",
		href: "#pizza",
	},
];

export const menuItems: MenuProduct[] = [
	{
		itemImage: "/kadak-chai.webp",
		itemId: "kadak-chai",
		itemName: "Kadak Chai",
		itemDescription: "Kadak Chai",
		category: 'Drinks',
		price: 699.0,
	},
	{
		itemImage: "/kuch-bhi-deal.webp",
		itemId: "kuch-bhi-deal",
		itemName: "Kuch Bhi Deal",
		category: 'Fast Food',
		itemDescription: "4 nuggs + Regular fries + Juice + Toy",
		addOns: [
			{
				heading: "Product",
				labels: ['select any 2'],
				addOnOptions: [
					{
						label: "Big Band",
						price: 0.0
					},
					{
						label: "Nuker Chicken",
						price: 0.0
					},
					{
						label: 'Zingster Pro',
						price: 0.0
					},
					{
						label: 'Madwrap (11-inch)',
						price: 0.0
					}
				],
				required: true,
			},
			{
				heading: "Soft Drink 345ML",
				addOnOptions: [
					{
						label: "7up",
						price: 0.0
					},
					{
						label: "Pepsi",
						price: 0.0
					},
					{
						label: 'Mirinda',
						price: 0.0
					},
					{
						label: 'Dew',
						price: 0.0
					}
				],
				required: true,
			}
		],
		price: 499.0,
	},
	{
		itemImage: "/Special-Pizza.jpg",
		itemId: "special-pizza-md",
		itemName: "Special Pizza MD",
		category: 'Fast Food',
		itemDescription:
			"Tasty Special Pizza Straight from Oven. Available in Medium Size Only",
		price: 1199.0,
	},
];

export const bannerImages = [
	{
		src: "/banner-1.webp",
		alt: "banner-1",
	},
	{
		src: "/banner-2.webp",
		alt: "banner-2",
	},
	{
		src: "/banner-3.webp",
		alt: "banner-3",
	},
];
