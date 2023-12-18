export type FormFieldType = 'input' | 'select' | 'textarea';

export interface FormField {
  type: FormFieldType;
  label: string;
  name: string;
  placeholder: string;
  options?: string[];
  inputExample?: string;
}

export interface FormPageProps {
    id: string | null;
    promptName: string | null
  }

export  interface Variable {
    id: string;
    type: FormFieldType;
    label: string;
    name: string;
    inputExample: string;
    placeholder: string;
    options: null | string[];
  }

export  interface PromptData {
    variables: Variable[];
    userId: string;
    salesPrice: string;
    title: string;
    description: string;
    category: {
      name: string;
      color: string;
    };
    promptContent: string;
    model: string;
    outputExample: string;
    usageCount: number;
    images: ImageType[];
    subCategories: SubCategory[]
    favorites: FavoriteData[]
    favoritesCount: number;
    imageIdThumbnail: string;
    _count?: { favorites: number }; 

  }

  export interface Category {
    id: string;
    name: string;
    color: string;
    subCategories?: SubCategory[];
  }
  
  export interface SubCategory {
    id: string;
    name: string;
  }
  
  export interface User {
    username: string;
    imageUrl: string;
    tokenBalance: number;
  }

  export interface UserData {
    username: string;
    imageUrl: string;
    tokenBalance: number;
    tokenFromSales: number;
    prompts: Prompt[];
  }
  
  export interface Prompt {
    id: string;
    title: string;
    description: string;
    category: Category;
    categoryId: string;
    subCategoryId: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    tab: string;
    type: string;
    model: string,
    price: string;
    salesPrice: number;
    promptContent: string;
    isModerated: boolean;
    favoritesCount: number;
    imageIdThumbnail: string;
    images: ImageType[]; 
    favorites?: { 
      id: string;
      userId: string;
      promptId: string;
      createdAt: Date;
    }[];
    _count?: { favorites: number }; 
  }

  export interface FormProps {
    onSubmit: (data: any) => void;
    isLoading: boolean;
    formFields: FormField[];
    variables: FormField[];
    setVariables: React.Dispatch<React.SetStateAction<FormField[]>>;
  }


  export interface IconSelectorProps {
    value: string;
    onChange: (value: string) => void;
  }

  export interface ToolbarProps {
    variables: FormField[];
    setVariables: React.Dispatch<React.SetStateAction<FormField[]>>;
    selection: Range | null;
    isTextSelected: boolean;
  }

  export type ImageType = {
    id: string;
    imageId: string;
    hash: string;
    uri: string;
    flags?: number;
  };


  export type OpenAIPayload = { 
    input: string 
    promptId?: string; 
  };

  export type MidjourneyPayload = {
    action: string;
    index: number;
    content: string;
    msgId?: string;
    hash?: string;
    flags?: number;
    promptId?: string; 
  };

  export interface FavoriteData {
    promptId: string;
    userId: string;
  }

  export type FormData = {
    title?: string;
    description?: string;
    type?: string;
    model?: string;
  };


  export interface ModelMap {
    [key: string]: string;
  }

export type FilterItemProps = {
    id: string;
    label: string;
    handleOnChange: () => void;
    isChecked: boolean;
};

export type FilterSectionProps = {
  title: string;
  items: {
      id: string;
      label: string;
      value: string;
      isChecked: boolean;
  }[];
  handleOnChange: (value: string) => void;
};

export type CategoryItemProps = {
  category: Category;
  handleCategoryChange: (categoryId: string) => void;
  handleSubCategoryChange: (subCategoryId: string) => void;
  selectedCategories: string[];
  selectedSubCategories: string[];
};

export type CategorySectionProps = {
  categories: Category[];
  handleCategoryChange: (categoryId: string) => void;
  handleSubCategoryChange: (subCategoryId: string) => void;
  selectedCategories: string[];
  selectedSubCategories: string[];
};

export interface Filters {
  types: string[];
  models: string[];
  categories: string[];
  subCategories: string[];
}

export interface FavoriteButtonProps {
  isFavorited: boolean;
  favoritesCount: number;
  onToggle: () => void;
}

export interface FavoriteContainerProps {
  initialIsFavorited: boolean;
  favoritesCount: number;
  onToggle: (currentIsFavorited: boolean) => void;
  promptId: string;
}

export interface PromptSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PromptUsage {
  tokenToSeller: number;
  promptId: string;
  type: string;
}

export interface PromptsListProps {
  searchQuery: string;
  displayedTools?: Prompt[];
  favoriteIds?: string[];
  PaginationComponent?: React.FC<PaginationProps>; 
  currentPage?: number; 
  onPageChange?: (pageNumber: number) => void; 
  totalPages?: number; 
  itemsPerPage?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export type PriceIdMap = {
  discovery: string;
  advantage: string;
  premium: string;
};

export type Subscription = {
  id: string;
  userId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd: Date;
  isPro: boolean;
  productName: string;
};