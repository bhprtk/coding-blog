# ✍️ Coding Blog

**Coding Blog** is a full-featured blog and content management system (CMS) built from the ground up using **React**, **Redux**, and **Firebase**. It allows users to read, like, bookmark, create, and manage blog posts with a powerful custom-built **WYSIWYG editor** powered by **Draft.js**. This project was built with flexibility in mind, offering full control over rich-text content creation and user interactions.

---

## 🚀 Features

- 📖 Read blog posts with clean, responsive layouts
- ❤️ Like and 🔖 bookmark posts
- 📝 Create and edit posts using a custom WYSIWYG editor (built with Draft.js)
- ✏️ Full content management: create, update, delete posts
- 🔐 Authentication and post management

---

## 🛠 Tech Stack

- **Frontend:** React, Redux
- **Editor:** Draft.js (custom WYSIWYG implementation)
- **Database & Hosting:** Firebase
- **State Management:** Redux
- **Styling:** CSS modules / styled components (optional depending on your setup)

---

## 📦 Installation

```bash
git clone https://github.com/bhprtk/coding-blog.git
cd coding-blog
npm install
```

---

## ⚙️ Usage

To run the development server locally:

```bash
npm start
```

Then open your browser and go to:

```
http://localhost:3000
```

> Note: Make sure to configure your Firebase project and add your credentials in a `.env` file or appropriate config file.

---

## 📄 Environment Variables

Create a `.env` file and include your Firebase credentials:

```
REACT_APP_API_KEY=your_api_key
REACT_APP_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
```

---

## 🧠 Why Draft.js?

Instead of relying on external editors, this project uses **Draft.js** to build a custom WYSIWYG experience tailored to blogging. It supports:
- Rich text formatting
- Editable content blocks
- Clean, serialized output for Firebase storage

This provides full control over how content is created, saved, and rendered.

---

## 📈 Future Improvements

- User authentication and protected editing
- Tagging and category filters
- Pagination and search
- Comment system
- Post scheduling and drafts

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

Built by [Pratik Bhandari](https://bhprtk.com)

---
