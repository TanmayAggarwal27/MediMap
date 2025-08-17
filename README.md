# 🩺 MediMap

**MediMap** is a web application that helps users find nearby chemist shops with the medicines they need. Users can search for medicines by name, salt composition, or filter results by pincode to locate nearby shops. Chemists can register and add their medicine stock to the system.

## 🔗 Live Demo

[https://medi-map-2fxd.vercel.app/](https://medi-map-2fxd.vercel.app/)

---

## 📌 Features

- 🔍 **Search Medicines** by name or salt composition
- 📍 **Filter by Pincode** to view local chemist shops
- 🧾 **Details for Each Medicine**: price, chemist, phone, and shop address
- 🧑‍💼 **Chemist Login** to add and manage medicines
- 🗃️ Simple and clean UI for ease of use

---

## 🧠 Tech Stack

- **Frontend**: HTML, CSS, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Deployment**: Vercel

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/medimap.git
cd medimap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root folder:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
```

### 4. Run the app

```bash
npm start
```

Then visit: [http://localhost:3000](http://localhost:3000)

---



## 🔍 Sample Search

- `"Paracetamol"`
- `"Ibuprofen"`
- `"Insulin"` (multiple types supported)
- Filter by pincode (e.g., `110085`, `400001`, etc.)

---

## 🛠️ Project Structure

```
├── models/
│   ├── medicine.js
│   └── user.js
├── routes/
│   └── index.js
├── views/
│   ├── medicines.ejs
│   └── login.ejs
├── public/
│   └── css/
├── .env
├── index.js
└── package.json
```

---

## 🙋‍♂️ Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m "Add something cool"`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

---

## 📧 Contact

Made with ❤️ by Tanmay Aggarwal      
📫 Email: tanmayagg.2005@gmail.com

Made with ❤️ by Akshat Gupta  
📫 Email: akshatx03x@gmail.com

Made with ❤️ by Kunj Gupta  
📫 Email: guptakunj029@gmail.com

---
