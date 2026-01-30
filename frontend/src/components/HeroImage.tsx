import Grid from "@mui/material/Grid";
import backgroundImageSrc from "../assets/images/hero.jpg";

export default function HeroImage() {
    return (
        <Grid
            size={{ xs: 0, md: 6 }}
            sx={{
                backgroundImage: `url(${backgroundImageSrc})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        />
    );
}
