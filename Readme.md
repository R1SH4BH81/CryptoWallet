# WebWise Media - Crypto Wallet

https://github.com/user-attachments/assets/61b776aa-87b9-4a31-b5cb-cdd44a695cc2




## Setup & Contribute

- `master` branch is for pushing **release version**. This branch is considered stable.
- `dev` branch is for pushing **new changes**. This branch is considered unstable.

### Setup

#### Clone the project

 **Download the project.**

   ```bash
   git clone https://github.com/WebWise-Media/Crypto-Wallet.git
   ```

 **Navigate into the folder.**

   ```bash
   cd Crypto-Wallet
   ```

#### Branching

1. **Create a new branch called `dev`.**

   ```bash
   git branch dev
   ```

2. **Switch to `dev` branch.**

   ```bash
   git checkout dev
   ```

3. **Sync the local `dev` branch to the repository `dev` branch.**

   ```bash
   git pull origin dev
   ```

4. **Create a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

5. **Install the dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

6. **Set up Firebase:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project or use an existing one.
   - Navigate to the Project Settings.
   - In the "Your apps" section, click on the web icon to create a new web app.
   - Follow the instructions to add Firebase SDK to your project.
   - Copy the Firebase configuration and create a `config.py` file in your project directory:

     ```python
     firebase_config = {
         "apiKey": "YOUR_API_KEY",
         "authDomain": "YOUR_PROJECT_ID.firebaseapp.com",
         "projectId": "YOUR_PROJECT_ID",
         "storageBucket": "YOUR_PROJECT_ID.appspot.com",
         "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
         "appId": "YOUR_APP_ID",
         "measurementId": "YOUR_MEASUREMENT_ID"
     }
     ```

  #### Finished 🎉!

Now run the project:

   ```bash
   flask run 
   ```
   or
   
   ```bash
   python main.py
   ```



### Contribute

commit your changes as usual.
```
git add .
git commit -m "<describe your changes>"
```

be sure to push it in `dev` branch.
```
git push origin dev
```
  

## Project File structure

```markdown
project_root/
├── api/
│   ├── auth.py
│   ├── database.py
│   ├── index.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── schemas.py
│   └── wallet_utils.py
├── btc/
│   ├── address_finder.py
│   ├── address_generator.py
│   ├── alpha.py
│   ├── coin_track.py
│   ├── importing.py
│   ├── key_finder.py
│   ├── master_key.py
│   ├── node.py
│   ├── seed.py
│   └── switcher.py
├── public/
│   └── static/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── store/
│   └── styles/
├── main.py
├── package.json
└── vercel.json
```
## Features

- User authentication with Firebase & FastAPI
- Wallet generation & import (BTC, LTC) using `bitcoinlib`
- Real-time balance & transaction tracking
- Modern web interface with React & Tailwind CSS
- Secure private key storage using SQLAlchemy & PostgreSQL

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Zustand
- **Backend:** FastAPI, Flask
- **Database:** PostgreSQL (SQLAlchemy), Firebase
- **Blockchain:** `bitcoinlib`
- **Security:** `bcrypt`, `python-jose`

---
