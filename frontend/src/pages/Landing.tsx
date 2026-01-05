import { ArrowRight, Link2, Sparkles, Twitter, Youtube } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FeatureCard from "../components/FeatureCard";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const Landing = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <section className="container py-24 md:py-32 mx-auto">
                <div className="flex flex-col items-center text-center gap-8">
                    <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>Your digital memory, organized</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
                        Save links, videos & tweets in your{" "}
                        <span className="text-primary">Second Brain</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                        Never lose an important link again. Organize your
                        favorite content from YouTube, Twitter, and across the
                        web in one beautiful dashboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/dashboard">
                            <Button size="lg">
                                Start Organizing
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="container py-24 border-t mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything you need to stay organized
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Simple, powerful tools to manage your digital content
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<Youtube className="h-6 w-6 text-primary" />}
                        title="Save Videos"
                        description="Bookmark YouTube videos with embedded previews. Watch later without losing track."
                    />
                    <FeatureCard
                        icon={<Twitter className="h-6 w-6 text-primary" />}
                        title="Capture Tweets"
                        description="Save important tweets with embedded previews. Never lose valuable insights."
                    />
                    <FeatureCard
                        icon={<Link2 className="h-6 w-6 text-primary" />}
                        title="Store Links"
                        description="Save any link with tags and categories. Search and filter with ease."
                    />
                </div>
            </section>
            <section className="container py-24 border-t mx-auto">
                <div className="flex flex-col items-center text-center gap-6 p-12 rounded-2xl bg-primary/5 border">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Ready to build your Second Brain?
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Join thousands of users who organize their digital life
                        with Second Brain.
                    </p>
                    <Link to={"/signin"}>
                        <Button>
                            Get Started Free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Landing;
