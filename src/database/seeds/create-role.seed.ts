import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Roles } from '../../roles/database/roles.entity';
import { RolesEnum } from '../../roles/enum/roles.enum';

export default class createRoleSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const roleRepository = dataSource.getRepository(Roles);

    const roles = [
      { name: RolesEnum.ADMIN, createdAt:new Date(Date.now()) },
      { name: RolesEnum.MANAGER, createdAt:new Date(Date.now()) },
      { name: RolesEnum.User, createdAt:new Date(Date.now()) },
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
