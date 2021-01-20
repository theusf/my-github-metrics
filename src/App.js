import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from 'react-countup';
import { Button, Avatar } from '@material-ui/core';
import BookIcon from '@material-ui/icons/Book';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import CircularProgress from '@material-ui/core/CircularProgress';

function App() {

  const [userData, setUserData] = useState(false);

  useEffect(() => {
    axios.get('https://api.github.com/users/theusf').then(response => {

      setTimeout(() => { setUserData(response.data); }, 50)

    })

  });


  return !userData ?

    <div className="app">
      <CircularProgress size={200}/>
    </div> :

    (
      <div className="app">


        <div className="profile">

          <div className="profile__coluna1">
            <div className="profile__info">
              <div className="profile_image_and_user">
                <Avatar src={userData.avatar_url} style={{ height: '200px', width: '200px' }} />
                <h1>
                  {userData.name}
                </h1>
                <p>@{userData.login}</p>

                <br />
                <p>{userData.company}</p>
                <p>{userData.location}</p>

                <div className="profile__button">
                  <Button
                    variant="outlined"
                    color={'inherit'}
                    startIcon={<GitHubIcon />}
                    href={userData.html_url}
                  >
                    Abrir perfil
              </Button>
                </div>


              </div >
            </div>


            <div className="profile__info">
              <h1>  <InfoIcon /> Bio </h1>
              <p> {userData.bio}</p>

            </div>

          </div>

          <div className="profile__coluna2">
            <div className="profile__info">
              <h1>  Repositórios </h1>
              <h2>
                <BookIcon /> <CountUp start={0} end={userData.public_repos ? userData.public_repos : 10} duration={5} delay={1}/>
              </h2>
            </div>

            <div className="profile__info">
              <h1>Seguidores </h1>
              <h2>
                <SupervisedUserCircleIcon /> <CountUp start={0} end={userData.followers ? userData.followers : 1} duration={5} delay={1}/>
              </h2>
            </div>

            <div className="profile__info">
              <h1>  Seguindo </h1>
              <h2>
                <FavoriteIcon /> <CountUp start={0} end={userData.following ? userData.following : 1} duration={5} delay={1}/>
              </h2>
            </div>
          </div>

        </div>

      </div>
    );
}

export default App;
