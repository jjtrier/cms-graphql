import Conn from '../_db';
import Sequelize from 'sequelize';

export const UsersToProjects = Conn.define('UsersToProjects', {
  role: {
    type: Sequelize.STRING
  }
}
);
