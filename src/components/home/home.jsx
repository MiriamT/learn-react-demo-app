import React from 'react';
import profile from '../../images/profile.jpg';
import americano from '../../images/americano.jpg';
import cappuccino from '../../images/cappuccino.jpg';
import latte from '../../images/latte.jpg';
import wallpaper from '../../images/coffee-wallpaper.jpg';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AboutMiriam,
  HomeS,
  ProfileS,
  SectionHeadingS,
  WallpaperS,
  WallpaperImgS,
  primaryColor,
  accentColor,
  TitleS,
  HeroS,
  FooterS,
} from './home.styles';

const Wallpaper = ({ imageSrc }) => {
  return (
    <WallpaperS>
      <WallpaperImgS src={imageSrc} />
    </WallpaperS>
  );
};

const Hero = () => {
  return (
    <HeroS>
      <Wallpaper imageSrc={wallpaper} />
    </HeroS>
  );
};

const SectionHeading = ({ topic }) => {
  return (
    <SectionHeadingS component="h2" sx={{ typography: 'h2' }}>
      More about{' '}
      <Box component="span" sx={{ color: accentColor }}>
        {topic}
      </Box>
    </SectionHeadingS>
  );
};

const Text = ({ children }) => {
  return (
    <Box component="p" sx={{ typography: 'h4', color: primaryColor }}>
      {children}
    </Box>
  );
};

export const Home = () => {
  return (
    <HomeS>
      <Hero />
      <Container maxWidth="lg">
        <TitleS
          variant="h1"
          sx={{
            typography: 'h1',
          }}
        >
          Hello!
        </TitleS>
        <Text>
          Welcome to Miriam's personal page. She loves coffee and design.
        </Text>

        <SectionHeading topic="Miriam" />
        <AboutMiriam>
          <Text>
            Miriam is a software engineer at Goldman Sachs, specializing in UI
            development. She graduated from Touro college and started her career
            at GS leading business intellengence projects. After spending a year
            researching blockchain in {'R&D'}, Miriam joined the Developer
            Experience team to chase her passion for building applications that
            people love to use.
          </Text>
          <ProfileS src={profile}></ProfileS>
        </AboutMiriam>

        <SectionHeading topic="Coffee" />
        <Box sx={{ display: 'flex' }}>
          <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardMedia
              component="img"
              height="140"
              image={americano}
              alt="americano"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Americano
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Caffè Americano is a type of coffee drink prepared by diluting
                an espresso with hot water, giving it a similar strength to, but
                different flavor from, traditionally brewed coffee.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardMedia
              component="img"
              height="140"
              image={cappuccino}
              alt="cappuccino"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Cappuccino
              </Typography>
              <Typography variant="body2" color="text.secondary">
                A cappuccino is an espresso-based coffee drink that originated
                in Austria with later development taking place in Italy, and is
                prepared with steamed milk foam.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ maxWidth: 345, margin: '1rem' }}>
            <CardMedia component="img" height="140" image={latte} alt="latte" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Latte
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Caffè latte, often shortened to just latte in English, is a
                coffee drink of Italian origin made with espresso and steamed
                milk.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <SectionHeading topic="Design" />
        <Box
          sx={{
            background: primaryColor,
            borderRadius: '10px',
            padding: '2rem',
          }}
        >
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">Design System</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                A Design System is a set of design foundations, guidelines, and
                components that unify a brand.
              </Typography>
              <div style={{ marginTop: '.5rem', display: 'flex' }}>
                <Button
                  href="https://material.io/design"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  Google Material Design
                </Button>
                <Button
                  href="https://www.carbondesignsystem.com/"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  IBM Carbon
                </Button>
                <Button
                  href="https://design.gs.com/"
                  target="_blank"
                  style={{ flexGrow: 1 }}
                >
                  GS Design System
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>

      <FooterS />
    </HomeS>
  );
};
