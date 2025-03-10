import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Roles } from '../../roles/database/roles.entity';
import { UserRole } from 'src/roles/enum/user-role.enum';

export default class CreateRoleSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roleRepository = dataSource.getRepository(Roles);

    const roles = [
      { name: UserRole.ADMIN, createdAt:new Date(Date.now()) },
      { name: UserRole.MANAGER, createdAt:new Date(Date.now()) },
      { name: UserRole.USER, createdAt:new Date(Date.now()) },
    ];

    for (const role of roles) {
      const existingRole = await roleRepository.findOne({ where: { name: role.name } });
      if (!existingRole) {
        await roleRepository.insert(role);
      }
    }

    console.log('Roles seeded successfully');
  }
}
