const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { raw } = require('express');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const { findByIdAndUpdate, findOne } = require('../../models/Profile');
const { check, validationResult } = require('express-validator');

//@route    Get Api/profile/me
//@desc     get Current User Profile
// @access   public

router.get('/me', auth, async function (req, res) {
  try {
    var profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );
    if (!profile) {
      return res.status(400).json({ msg: 'There is no such Profile For User' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//@route    Get Api/profile/me
//@desc     Create Or Update a User
// @access   private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status Is Required').not().isEmpty(),
      check('skills', 'Skills Is Requires').not().isEmpty(),
    ],
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      instagram,
      linkedin,
    } = req.body;

    //BuilD Profil eObject
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    //Build Social Field Objects
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
//@route    Get Api/profile/me
//@desc    Get all profiles
// @access public

router.get('/', async function (req, res) {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Errro');
  }
});

//@route    Get Api/profile/me
//@desc    Get a particular id profiles
// @access public

router.get('/user/:user_id', async function (req, res) {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is No profile' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Errro');
  }
});

//@route    Delete Api/profile/me
//@desc   delete profile, user & post
// @access private

router.delete('/', auth, async function (req, res) {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User Removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Errro');
  }
});

module.exports = router;
