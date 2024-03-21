echo "Starting..."

cd client

npx -S serve -p 5500 &
cd ..
cd server

if [ -f ./.env ]; then 
    echo "env file already created"
else
    echo "creating env file"
    touch .env
    echo -e "USERNAMEAUTH=\"TOTO\" \nPASSWORDAUTH=\"PASSWORD\" \nUSERNAMEAUTHADMIN=\"EWEN\" \nPASSWORDAUTHADMIN=\"PASSWORD\" \nVISITOR=\"visitor\" A\nDMIN=\"administrator\" \nSECRET_KEY=\"YGD*m$$Pb2*45U#9f8DF%@@85X#456e3cyyQr&@B&\"" >> ./.env
    echo ./.env
fi

npm run start
