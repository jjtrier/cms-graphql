import Conn from '../_db';
import Sequelize from 'sequelize';

export const Project = Conn.define('project', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}
);
