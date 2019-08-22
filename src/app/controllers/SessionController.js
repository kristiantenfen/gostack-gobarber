import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';

import authConfig from '../../config/auth';

class SessionController {
  async auth(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation failed' });
    }
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(req.body.password))) {
      res.status(401).json({ message: 'Password does match' });
    }

    return res.json({
      user,
      token: jwt.sign(
        {
          id: user.id,
        },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn }
      ),
    });
  }
}

export default new SessionController();
