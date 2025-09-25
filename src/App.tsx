import React, { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import {
    Menu,
    Search,
    Bell,
    User,
    Globe,
    TrendingUp,
    Clock,
    Play,
    ChevronRight,
    Star,
    MessageSquare,
    Share2,
    Bookmark
} from 'lucide-react'

interface NewsArticle {
    id: string
    title: string
    excerpt: string
    category: string
    readTime: string
    timestamp: string
    author: string
    featured?: boolean
}

export default function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('Latest')
    const [searchQuery, setSearchQuery] = useState('')

    const categories = ['Latest', 'Politics', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health', 'Science']

    const newsArticles: NewsArticle[] = [
        {
            id: '1',
            title: 'Global Climate Summit Reaches Historic Agreement on Carbon Emissions',
            excerpt: 'World leaders unite in unprecedented climate action plan targeting net-zero emissions by 2050...',
            category: 'Politics',
            readTime: '5 min read',
            timestamp: '2 hours ago',
            author: 'Hackerslord',
            featured: true
        },
        {
            id: '2',
            title: 'Revolutionary AI Technology Transforms Healthcare Diagnostics',
            excerpt: 'New artificial intelligence system shows 95% accuracy in early disease detection...',
            category: 'Technology',
            readTime: '4 min read',
            timestamp: '4 hours ago',
            author: 'Michael Chen'
        },
        {
            id: '3',
            title: 'Stock Markets Surge Following Economic Recovery Reports',
            excerpt: 'Major indices reach record highs as employment figures exceed expectations...',
            category: 'Business',
            readTime: '3 min read',
            timestamp: '6 hours ago',
            author: 'Emma Rodriguez'
        },
        {
            id: '4',
            title: 'Championship Finals Draw Record Viewership Numbers',
            excerpt: 'Sports fans worldwide tune in for the most-watched championship game in history...',
            category: 'Sports',
            readTime: '2 min read',
            timestamp: '8 hours ago',
            author: 'David Wilson'
        },
        {
            id: '5',
            title: 'Breakthrough Medical Research Offers Hope for Rare Diseases',
            excerpt: 'Scientists develop new treatment approach that could benefit millions of patients...',
            category: 'Health',
            readTime: '6 min read',
            timestamp: '12 hours ago',
            author: 'Dr. Lisa Thompson'
        },
        {
            id: '6',
            title: 'Space Exploration Mission Discovers Water on Distant Planet',
            excerpt: 'NASA announces groundbreaking discovery that could indicate potential for extraterrestrial life...',
            category: 'Science',
            readTime: '5 min read',
            timestamp: '1 day ago',
            author: 'James Parker'
        }
    ]

    const trendingTopics = [
        'Climate Summit 2024',
        'AI Healthcare',
        'Economic Recovery',
        'Championship Finals',
        'Space Discovery',
        'Medical Breakthrough'
    ]

    const filteredArticles = newsArticles.filter(article =>
        selectedCategory === 'Latest' || article.category === selectedCategory
    ).filter(article =>
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const featuredArticle = newsArticles.find(article => article.featured)
    const regularArticles = newsArticles.filter(article => !article.featured)

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-background border-b border-border">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">BP</span>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="font-bold text-xl text-foreground">Berry Pulse</h1>
                                    <p className="text-xs text-muted-foreground -mt-1">Media Inc.</p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-6">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${
                                        selectedCategory === category ? 'text-primary' : 'text-muted-foreground'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </nav>

                        {/* Search and Actions */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search news..."
                                        className="pl-9 w-64"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <User className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden pb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search news..."
                                className="pl-9 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-border bg-background">
                        <nav className="container mx-auto px-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => {
                                            setSelectedCategory(category)
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className={`text-left text-sm font-medium transition-colors hover:text-primary ${
                                            selectedCategory === category ? 'text-primary' : 'text-muted-foreground'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Breaking News Banner */}
                <div className="mb-8 bg-destructive text-destructive-foreground rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse"></div>
                            <span className="font-bold text-sm">BREAKING</span>
                        </div>
                        <p className="text-sm font-medium">
                            Global Climate Summit reaches historic agreement - Live updates continue
                        </p>
                        <Button variant="ghost" size="sm" className="ml-auto text-destructive-foreground hover:bg-destructive-foreground/10">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Featured Article */}
                        {featuredArticle && (
                            <Card className="overflow-hidden">
                                <div className="relative">
                                    <img
                                        src="https://placeholder-image-service.onrender.com/image/800x400?prompt=Global climate summit with world leaders in conference room discussing environmental policies&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ"
                                        alt="Global climate summit with world leaders in conference room discussing environmental policies"
                                        className="w-full h-64 md:h-80 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      FEATURED
                    </span>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
                                    >
                                        <Play className="h-6 w-6" />
                                    </Button>
                                </div>
                                <CardHeader>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
                      {featuredArticle.category}
                    </span>
                                        <Clock className="h-4 w-4" />
                                        <span>{featuredArticle.timestamp}</span>
                                        <span>•</span>
                                        <span>{featuredArticle.readTime}</span>
                                    </div>
                                    <CardTitle className="text-2xl md:text-3xl leading-tight">
                                        {featuredArticle.title}
                                    </CardTitle>
                                    <CardDescription className="text-base leading-relaxed">
                                        {featuredArticle.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="https://placeholder-image-service.onrender.com/image/32x32?prompt=Professional headshot of female journalist Sarah Johnson&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ" />
                                                <AvatarFallback>SJ</AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium text-foreground">{featuredArticle.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button variant="ghost" size="sm">
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                24
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Bookmark className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* News Grid */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground">
                                    {selectedCategory} News
                                </h2>
                                <Button variant="outline" size="sm">
                                    View All
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {filteredArticles.slice(0, 6).map((article, index) => (
                                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                        <div className="relative">
                                            <img
                                                src={`https://placeholder-image-service.onrender.com/image/400x200?prompt=News article image for ${article.category.toLowerCase()} story about ${article.title.toLowerCase().substring(0, 50)}&id=e813e509-2e04-4cfe-9271-1535c3f8d419&customer_id=cus_SUZXDYudUX1iyQ`}
                                                alt={`News article image depicting ${article.title}`}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="absolute top-2 left-2">
                        <span className="bg-background/90 text-foreground text-xs font-medium px-2 py-1 rounded">
                          {article.category}
                        </span>
                                            </div>
                                        </div>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg leading-tight line-clamp-2">
                                                {article.title}
                                            </CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {article.excerpt}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{article.timestamp}</span>
                                                    <span>•</span>
                                                    <span>{article.readTime}</span>
                                                </div>
                                                <span className="font-medium">{article.author}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Trending Topics */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    <span>Trending Now</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {trendingTopics.map((topic, index) => (
                                        <div key={index} className="flex items-center space-x-3 hover:bg-accent hover:text-accent-foreground p-2 rounded cursor-pointer transition-colors">
                                            <span className="text-primary font-bold text-sm">#{index + 1}</span>
                                            <span className="text-sm font-medium">{topic}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Live Updates */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                                    <span>Live Updates</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="border-l-2 border-primary pl-4">
                                        <p className="text-sm font-medium">Climate Summit Day 2</p>
                                        <p className="text-xs text-muted-foreground">15:30 - New agreements announced</p>
                                    </div>
                                    <div className="border-l-2 border-muted pl-4">
                                        <p className="text-sm font-medium">Market Update</p>
                                        <p className="text-xs text-muted-foreground">14:45 - Indices continue upward trend</p>
                                    </div>
                                    <div className="border-l-2 border-muted pl-4">
                                        <p className="text-sm font-medium">Tech News</p>
                                        <p className="text-xs text-muted-foreground">13:20 - AI breakthrough in healthcare</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Weather Widget */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Globe className="h-5 w-5 text-primary" />
                                    <span>Weather</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary mb-2">22°C</div>
                                    <p className="text-sm text-muted-foreground mb-2">Partly Cloudy</p>
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>High: 25°</span>
                                        <span>Low: 18°</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Newsletter Signup */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Stay Informed</CardTitle>
                                <CardDescription>
                                    Get the latest news delivered to your inbox
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Input type="email" placeholder="Enter your email" />
                                    <Button className="w-full">
                                        Subscribe
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-muted mt-16">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">BP</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Berry Pulse</h3>
                                    <p className="text-xs text-muted-foreground">Media Inc.</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of global events.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Categories</h4>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">About</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p><a href="#" className="hover:text-primary transition-colors">Our Story</a></p>
                                <p><a href="#" className="hover:text-primary transition-colors">Editorial Standards</a></p>
                                <p><a href="#" className="hover:text-primary transition-colors">Careers</a></p>
                                <p><a href="#" className="hover:text-primary transition-colors">Contact Us</a></p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p><a href="#" className="hover:text-primary transition-colors">Twitter</a></p>
                                <p><a href="#" className="hover:text-primary transition-colors">Facebook</a></p>
                                <p><a href="#" className="hover:text-primary transition-colors">Instagram</a></p>
                                <p><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border mt-8 pt-8 text-center">
                        <p className="text-sm text-muted-foreground">
                            © 2024 Berry Pulse Media Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}