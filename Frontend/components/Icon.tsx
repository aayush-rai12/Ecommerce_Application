import { SVGProps } from "react";
import * as HeroIcons from "@heroicons/react/24/outline";
import * as HeroIconsSolid from "@heroicons/react/24/solid";

export type IconName = 
  | "bag"
  | "minus"
  | "plus"
  | "chevronDown"
  | "chevronUp"
  | "check"
  | "truck"
  | "globe"
  | "document"
  | "tag"
  | "arrowRight"
  | "close"
  | "menu"
  | "grid"
  | "user"
  | "search"
  | "lock"
  | "refresh"
  | "sparkles"
  | "play"
  | "pause"
  | "shield"
  | "scissors"
  | "chevronRight"
  | "chevronLeft"
  | "share"
  | "heart"
  | "users"
  | "mapPin"
  | "bolt"
  | "bookmark"
  | "eye"
  | "heartFilled"
  | "bookmarkFilled"
  | "star"
  | "starFilled"
  | "creditCard"
  | "bell"
  | "questionMarkCircle";

export interface IconProps extends React.ComponentProps<"svg"> {
  name: IconName;
  className?: string;
}

// Map icon names to actual components (static mapping to avoid creating components during render)
const ICON_MAP: Record<IconName, React.ComponentType<SVGProps<SVGSVGElement>> | undefined> = {
  bag: HeroIcons.ShoppingBagIcon,
  minus: HeroIcons.MinusIcon,
  plus: HeroIcons.PlusIcon,
  chevronDown: HeroIcons.ChevronDownIcon,
  chevronUp: HeroIcons.ChevronUpIcon,
  check: HeroIcons.CheckIcon,
  truck: HeroIcons.TruckIcon,
  globe: HeroIcons.GlobeAltIcon,
  document: HeroIcons.DocumentTextIcon,
  tag: HeroIcons.TagIcon,
  arrowRight: HeroIcons.ArrowRightIcon,
  close: HeroIcons.XMarkIcon,
  menu: HeroIcons.Bars3Icon,
  grid: HeroIcons.Squares2X2Icon,
  user: HeroIcons.UserIcon,
  search: HeroIcons.MagnifyingGlassIcon,
  lock: HeroIcons.LockClosedIcon,
  refresh: HeroIcons.ArrowPathIcon,
  sparkles: HeroIcons.SparklesIcon,
  shield: HeroIcons.ShieldCheckIcon,
  scissors: HeroIcons.ScissorsIcon,
  chevronRight: HeroIcons.ChevronRightIcon,
  chevronLeft: HeroIcons.ChevronLeftIcon,
  share: HeroIcons.ShareIcon,
  play: HeroIcons.PlayIcon,
  pause: HeroIcons.PauseIcon,
  heart: HeroIcons.HeartIcon,
  users: HeroIcons.UsersIcon,
  mapPin: HeroIcons.MapPinIcon,
  bolt: HeroIcons.BoltIcon,
  bookmark: HeroIcons.BookmarkIcon,
  eye: HeroIcons.EyeIcon,
  heartFilled: HeroIconsSolid.HeartIcon,
  bookmarkFilled: HeroIconsSolid.BookmarkIcon,
  star: HeroIcons.StarIcon,
  starFilled: HeroIconsSolid.StarIcon,
  creditCard: HeroIcons.CreditCardIcon,
  bell: HeroIcons.BellIcon,
  questionMarkCircle: HeroIcons.QuestionMarkCircleIcon,
};

export function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent className={className} {...props} />;
}