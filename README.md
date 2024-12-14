# Hands2Words
Our mission is to empower individuals through accessible and engaging American Sign Language (ASL) education. We strive to create an inclusive community where learners of all ages can develop their signing skills, foster cultural understanding, and promote effective communication. By providing innovative learning tools, interactive resources, and real-time feedback, we aim to enhance the ASL learning experience through Machine Learning, ensuring that every learner feels confident and supported on their journey to fluency.

# Both the frontend and backend need to be started up. 

# Setting up React 
npm install - will retrieve all node modules 

# Run The Frontend 
npm run start - will start the frontend.

# Setting up the Backend 

Go to [Anaconda](https://www.anaconda.com/download) </br>
Make sure you download the installer and the powershell prompt </br>
 
# Once Installed 
Cd into backend folder </br>
cd backend </br>

# Delete old virtual Env 
rm -rf path_to_your_virtual_env <br>
or <br>
Remove-Item -Recurse -Force path_to_your_virtual_env <br>

# Open up Anaconda Powershell Prompt </br>
# Create a virtual environment 
conda create --name modelenv python=3.11 </br>
conda activate modelenv  </br>

# While virtual env is running:
pip install -r requirements.txt </br>
It will install all necessary pip packages </br>

# Go back to VScode 
Change command pallete </br>
ctrl + shift + p
Click Python: Select Interpreter 
Choose the new conda env

# To run server 
Python manage.py runserver

# Deactivate 
conda deactivate  </br>
