import { TypeOrmConfigModule } from "./typeOrm.module";
import { GraphqlConfigModule } from "./graphql.module";
import { I18nConfigModule } from "./i18n.module";
import { ConfigAppModule } from "./config.module";

export {
  TypeOrmConfigModule as TypeOrm,
  GraphqlConfigModule as Graphql,
  I18nConfigModule as I18n,
  ConfigAppModule as Config
};
