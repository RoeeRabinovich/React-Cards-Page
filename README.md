# R-Cards React App

R-Cards is a full-featured business card management application built with React, Redux, TypeScript, Vite, and Flowbite-React. It supports user authentication, role-based access, card CRUD operations, favorites, and a modern responsive UI.

---

## Features

- **User Authentication:** Register, login, and logout with secure JWT-based authentication.
- **Role-Based Access:** Supports regular users, business users (can create cards), and admins (can manage users/cards).
- **Card Management:** Create, view, edit, and delete business cards. Cards include title, description, contact info, and images.
- **Favorites:** Users can like/unlike cards and view their favorites.
- **Profile Management:** Users can view and edit their profile details.
- **Admin Panel:** Admins can view, edit, and delete any user or card.
- **Search & Pagination:** Search cards/users and navigate large lists with pagination.
- **Responsive UI:** Built with Flowbite-React and Tailwind CSS for a modern, mobile-friendly experience.
- **Form Validation:** All forms use Joi schemas for robust validation and user feedback.
- **Notifications:** Uses React-Toastify for instant feedback on actions and errors.
- **API Integration:** Axios is used for all backend communication, with token management and error handling.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Flowbite-React, Tailwind CSS
- **State Management:** Redux Toolkit
- **Forms & Validation:** React Hook Form, Joi
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Notifications:** React-Toastify

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository or download the project files.
2. Navigate to the project directory:
   ```sh
   cd "React Cards Page/flowbite-react-app"
   ```
3. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

```sh
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` by default.

---

## Project Structure

- `src/components/` - Reusable UI components (CardsTable, UsersTable, Edit forms, Footer, etc.)
- `src/pages/` - Page components for each route (Home, About, Profile, AdminPanel, etc.)
- `src/validations/` - Joi schemas for form validation (register, login, createCard)
- `store/` - Redux slices and store configuration (userSlice, cardSlice, etc.)
- `public/` - Static assets (logo, images)
- `index.html` - Main HTML template

---

## Development Notes

- **Type Safety:** All components and Redux slices use TypeScript for type safety.
- **Error Handling:** API errors are caught and displayed to users via toast notifications.
- **Form UX:** Forms disable the submit button if no changes are made or if validation fails.
- **Instant UI Updates:** Redux state updates immediately after edits, so the UI reflects changes without a full refresh.

---

## License

MIT

---

Created by Roee Rabinovich
