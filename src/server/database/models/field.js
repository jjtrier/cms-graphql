import Conn from '../_db';
import Sequelize from 'sequelize';

export const Field = Conn.define('field', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  dataJSON: {
    type: Sequelize.JSON,
    allowNull: true
  }
}
);
