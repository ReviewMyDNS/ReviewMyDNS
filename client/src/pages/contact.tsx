import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Lock, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/pricing">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Pricing
                </Button>
              </Link>
              <div className="flex items-center">
                <Lock className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-xl font-bold text-gray-900">ReviewMyDNS</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signin?tab=signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Enterprise Sales
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our sales team to discuss Enterprise features, custom pricing, and implementation support for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tell us about your needs</CardTitle>
                <CardDescription>
                  We'll get back to you within 24 hours with a custom proposal.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="employees">Company Size</Label>
                    <select
                      id="employees"
                      name="employees"
                      value={formData.employees}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about your DNS monitoring needs</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="What DNS monitoring challenges are you trying to solve? How many domains do you manage? Any specific requirements?"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Contact Sales Team
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information & Enterprise Features */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-gray-600">info@reviewmydns.com</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-sm text-gray-600">312 W 2nd St, Unit 2867<br />Casper, WY 82601</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium">Business Hours</div>
                    <div className="text-sm text-gray-600">Monday - Friday, 9 AM - 6 PM EST</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Features */}
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Includes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Unlimited DNS queries",
                    "Unlimited team members",
                    "Advanced analytics & reporting",
                    "Custom integrations",
                    "Dedicated account manager",
                    "24/7 priority support",
                    "Custom SLA agreements",
                    "On-premise deployment options",
                    "Advanced security features",
                    "Custom training & onboarding"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}