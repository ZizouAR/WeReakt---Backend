import express from 'express';
import apikey from '../../auth/apikey';
import signup from './access/signup';
import login from './access/login';
import logout from './access/logout';
import token from './access/token';
import blogList from './blog/blogList';
import blogDetail from './blog/blogDetail';
import writer from './blog/writer';
import editor from './blog/editor';
import message from './message';
import note from './note';
import job from './job';
import departement from './departement';
import network from './network';
import group from './group';
import meeting from './meeting';
import hierarchy from './hierarchy';


const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
router.use('/', apikey);
/*-------------------------------------------------------------------------*/

router.use('/signup', signup);
router.use('/login', login);
router.use('/logout', logout);
router.use('/token', token);
router.use('/blogs', blogList);
router.use('/blog', blogDetail);
router.use('/writer/blog', writer);
router.use('/editor/blog', editor);
router.use('/note', note);
router.use('/departement', departement);
router.use('/message', message);
router.use('/job', job);
router.use('/network', network);
router.use('/group', group);
router.use('/hierarchy', hierarchy);
router.use('/meeting', meeting);



export default router;
