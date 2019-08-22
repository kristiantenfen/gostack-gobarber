import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .requred(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    const { email } = req.body;

    if (
      await User.findOne({
        where: {
          email,
        },
      })
    ) {
      return res.json({ message: 'Email already is used' });
    }

    const user = await User.create(req.body);
    return res.json(user);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      if (
        await User.findOne({
          where: {
            email,
          },
        })
      ) {
        return res.json({ message: 'Email already is used' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.json({ message: 'Password does not match' });
    }

    const userUpdated = await user.update(req.body);
    return res.json(userUpdated);
  }

  async index(req, res) {
    const users = await User.findAll();

    res.json(users);
  }

  async delete(req, res) {
    const user = await User.delete(req.params.id);

    res.json(user);
  }
}

export default new UserController();
