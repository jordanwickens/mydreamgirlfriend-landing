import type { Schema, Struct } from '@strapi/strapi';

export interface SharedComparisonFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_comparison_features';
  info: {
    description: 'A feature comparison row';
    displayName: 'Comparison Feature';
  };
  attributes: {
    feature: Schema.Attribute.String & Schema.Attribute.Required;
    them: Schema.Attribute.Text & Schema.Attribute.Required;
    us: Schema.Attribute.Text & Schema.Attribute.Required;
    winner: Schema.Attribute.Enumeration<['us', 'them', 'tie']> &
      Schema.Attribute.Required;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    description: 'A question and answer pair';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.comparison-feature': SharedComparisonFeature;
      'shared.faq-item': SharedFaqItem;
    }
  }
}
