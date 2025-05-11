
import { MenuItem, TableAvailability, Booking, GalleryImage } from '../types';

// In-memory storage for our mock database
const storage = {
  bookings: [] as Booking[],
  tables: [
    {
      id: "t1",
      tableNumber: 1,
      capacity: 2,
      isAvailable: true
    },
    {
      id: "t2",
      tableNumber: 2,
      capacity: 4,
      isAvailable: true
    },
    {
      id: "t3",
      tableNumber: 3,
      capacity: 6,
      isAvailable: false
    },
    {
      id: "t4",
      tableNumber: 4,
      capacity: 4,
      isAvailable: true
    },
    {
      id: "t5",
      tableNumber: 5,
      capacity: 8,
      isAvailable: true
    },
    {
      id: "t6",
      tableNumber: 6,
      capacity: 2,
      isAvailable: false
    },
  ] as TableAvailability[],
};

// Mock menu items
export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Traditional Kitfo",
    description: "Freshly minced raw beef seasoned with mitmita (spicy chili powder) and niter kibbeh (clarified butter infused with herbs and spices).",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=800&auto=format&fit=crop&q=80",
    category: "Signature Dishes"
  },
  {
    id: "2",
    name: "Lega Tibs",
    description: "Tender pieces of meat sautéed with rosemary, onions, and peppers, served sizzling hot.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1605491130710-81aef37f9635?w=800&auto=format&fit=crop&q=80",
    category: "Main Courses"
  },
  {
    id: "3",
    name: "Vegetarian Combo",
    description: "A combination of various vegetarian dishes including misir wot (spicy red lentils), kik alicha (split peas), gomen (collard greens), and tikil gomen (cabbage and carrots).",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1567982047351-7935297eff55?w=800&auto=format&fit=crop&q=80",
    category: "Vegetarian"
  },
  {
    id: "4",
    name: "Doro Wot",
    description: "Spicy chicken stew simmered with berbere spice, served with a hard-boiled egg.",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?w=800&auto=format&fit=crop&q=80",
    category: "Main Courses"
  },
  {
    id: "5",
    name: "Shiro",
    description: "A thick, spicy stew made from ground chickpeas, often served with injera.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&auto=format&fit=crop&q=80",
    category: "Vegetarian"
  },
  {
    id: "6",
    name: "Ethiopian Coffee Ceremony",
    description: "Traditional coffee ceremony with freshly roasted beans, served with popcorn.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1518057111178-44a106bad636?w=800&auto=format&fit=crop&q=80",
    category: "Beverages"
  },
];

// Mock gallery images
export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&auto=format&fit=crop&q=80",
    alt: "Restaurant interior view with traditional Ethiopian decor",
    category: "Interior"
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    alt: "Cozy seating area with traditional low tables",
    category: "Interior"
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    alt: "Chef preparing traditional Ethiopian dishes",
    category: "Kitchen"
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80",
    alt: "Beautiful plating of Ethiopian cuisine",
    category: "Food"
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&auto=format&fit=crop&q=80",
    alt: "Traditional coffee ceremony setup",
    category: "Culture"
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80",
    alt: "Exterior view of the restaurant",
    category: "Exterior"
  }
];

// Get all menu items
export const getMenuItems = (): Promise<MenuItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(menuItems), 300);
  });
};

// Get available tables for a specific date
export const getAvailableTables = (date: string): Promise<TableAvailability[]> => {
  return new Promise((resolve) => {
    // Check which tables are already booked for this date
    const bookedTableIds = storage.bookings
      .filter(booking => booking.date === date && booking.status !== 'canceled')
      .map(booking => booking.tableId);

    // Update availability based on bookings
    const availableTables = storage.tables.map(table => ({
      ...table,
      isAvailable: bookedTableIds.includes(table.id) ? false : table.isAvailable
    }));

    setTimeout(() => resolve(availableTables), 300);
  });
};

// Get all gallery images
export const getGalleryImages = (): Promise<GalleryImage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(galleryImages), 300);
  });
};

// Create a new booking
export const createBooking = (booking: Omit<Booking, "id">): Promise<Booking> => {
  return new Promise((resolve) => {
    // Find an available table that matches the guest count
    const availableTable = storage.tables.find(t => 
      t.isAvailable && t.capacity >= booking.guests && !storage.bookings
        .filter(b => b.date === booking.date && b.time === booking.time && b.status !== 'canceled')
        .some(b => b.tableId === t.id)
    );

    const newBooking = {
      ...booking,
      id: `booking-${Date.now()}`,
      tableId: availableTable?.id || undefined
    };
    
    // Save to our mock storage
    storage.bookings.push(newBooking);
    
    setTimeout(() => resolve(newBooking), 500);
  });
};

// Get all bookings (for admin)
export const getAllBookings = (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...storage.bookings]), 300);
  });
};

// Update booking status
export const updateBookingStatus = (bookingId: string, status: Booking['status']): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    const index = storage.bookings.findIndex(booking => booking.id === bookingId);
    
    if (index === -1) {
      reject(new Error("Booking not found"));
      return;
    }
    
    storage.bookings[index].status = status;
    setTimeout(() => resolve(storage.bookings[index]), 300);
  });
};

// Update table availability
export const updateTableAvailability = (tableId: string, isAvailable: boolean): Promise<TableAvailability> => {
  return new Promise((resolve, reject) => {
    const index = storage.tables.findIndex(t => t.id === tableId);
    if (index === -1) {
      reject(new Error("Table not found"));
      return;
    }
    
    storage.tables[index].isAvailable = isAvailable;
    setTimeout(() => resolve(storage.tables[index]), 300);
  });
};

// Update menu item
export const updateMenuItem = (menuItem: MenuItem): Promise<MenuItem> => {
  return new Promise((resolve, reject) => {
    const index = menuItems.findIndex(item => item.id === menuItem.id);
    if (index === -1) {
      reject(new Error("Menu item not found"));
      return;
    }
    
    menuItems[index] = menuItem;
    setTimeout(() => resolve(menuItem), 300);
  });
};

// Add menu item
export const addMenuItem = (menuItem: Omit<MenuItem, "id">): Promise<MenuItem> => {
  return new Promise((resolve) => {
    const newItem = {
      ...menuItem,
      id: `menu-${Date.now()}`
    };
    
    menuItems.push(newItem);
    setTimeout(() => resolve(newItem), 300);
  });
};

// Add a gallery image
export const addGalleryImage = (image: Omit<GalleryImage, "id">): Promise<GalleryImage> => {
  return new Promise((resolve) => {
    const newImage = {
      ...image,
      id: `gallery-${Date.now()}`
    };
    
    galleryImages.push(newImage);
    setTimeout(() => resolve(newImage), 300);
  });
};

// Update a gallery image
export const updateGalleryImage = (image: GalleryImage): Promise<GalleryImage> => {
  return new Promise((resolve, reject) => {
    const index = galleryImages.findIndex(img => img.id === image.id);
    if (index === -1) {
      reject(new Error("Gallery image not found"));
      return;
    }
    
    galleryImages[index] = image;
    setTimeout(() => resolve(image), 300);
  });
};

// Delete a gallery image
export const deleteGalleryImage = (imageId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = galleryImages.findIndex(img => img.id === imageId);
    if (index !== -1) {
      galleryImages.splice(index, 1);
    }
    setTimeout(() => resolve(true), 300);
  });
};

// Add a table
export const addTable = (table: Omit<TableAvailability, "id">): Promise<TableAvailability> => {
  return new Promise((resolve) => {
    const newTable = {
      ...table,
      id: `table-${Date.now()}`
    };
    
    storage.tables.push(newTable);
    setTimeout(() => resolve(newTable), 300);
  });
};
