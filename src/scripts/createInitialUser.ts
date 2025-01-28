import dbConnect from '../lib/mongodb';
import User from '../models/User';


async function createInitialUser() {
  try {
    await dbConnect();
    
    const adminUser = new User({
      email: 'admin@dashboard.nomadadigital.com.ar',
      password: 'NomadaDigital$',
      name: 'Admin User',
      role: 'admin'
    });

    await adminUser.save();
    console.log('Usuario admin creado exitosamente');
  } catch (error) {
    console.error('Error creando usuario:', error);
  }
  process.exit();
}

void createInitialUser();