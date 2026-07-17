'use client';

//Atoms
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Logo from '@/components/ui/logo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Spacer from './ui/spacer';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import Typography from './ui/typography';

//Molecules
import Breadcrumbs from './molecules/breadcrumbs';
import AuthorBox from './molecules/author-box';
import HeroSection from './molecules/hero-section';
import ListItem from './molecules/list-item';
import RelatedLinks from './molecules/related-links';
import SectionBlock from './molecules/section-block';
import ServiceCard from '@/components/molecules/service-card';
import Separator from './molecules/separator';
import TalkTo from './molecules/scroll-to';

//Organisms
import { Faq } from './organisms/faq';
import Enumeration from './organisms/enumeration';
import Footer from '@/components/organisms/footer';
import Header from '@/components/organisms/header';
import HeadlineContent from './organisms/headline-content';
import List from './organisms/list';
import { Navigation } from '@/components/organisms/navigation';
import Rating from './organisms/rating';
import { PriceTable } from './organisms/price-table';
import { Testimonials } from './organisms/testimonials';

export const UI = {
  //Atoms
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Logo,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Spacer,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Testimonials,
  Typography,

  // Molecules
  AuthorBox,
  Breadcrumbs,
  HeroSection,
  List,
  RelatedLinks,
  SectionBlock,
  ServiceCard,
  Separator,
  TalkTo,

  // Organisms
  Enumeration,
  Faq,
  Footer,
  Header,
  HeadlineContent,
  ListItem,
  Navigation,
  PriceTable,
  Rating,
};
