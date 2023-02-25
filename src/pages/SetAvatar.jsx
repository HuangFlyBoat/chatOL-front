import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Loader from '../assets/loader.gif';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { SetAvatarRoute } from '../utils/APIRoutes';
function SetAvatar(props) {
  const api = 'https://api.multiavatar.com/45678945';
  const navigate = useNavigate();
  return <div></div>;
}

export default SetAvatar;
