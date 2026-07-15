export type BenefitItem = {
  id: number;
  title: string;
};

export type BreadcrumbsItem = {
  title: string;
  url: string;
};

export type ImageItem = {
  url?: string;
  alternativeText?: string;
  data?: {
    attributes: {
      url: string;
      alternativeText?: string;
    };
  };
};

export type HeroHeaderProps = {
  image: ImageItem;
  headline: string;
  subline: string;
  breadcrumbs?: BreadcrumbsItem[];
  benefits: BenefitItem[];
  rating: number;
};
