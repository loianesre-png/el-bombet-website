import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getContactFormWebhook, isContactFormEnabled } from "@/config";

/**
 * CalendarForm Component
 * Contact/booking request form with date pickers
 *
 * Configuration:
 * - Webhook URL is configured in src/config/site.config.ts
 * - Form labels can be passed as props from parent Astro component
 *
 * @param {Object} props
 * @param {Object} props.content - Form content/labels (from content dictionary)
 */
const CalendarForm = ({ content = {} }) => {
  // Get webhook URL from centralized config
  const webhookUrl = getContactFormWebhook();
  const formEnabled = isContactFormEnabled();

  // Default content with Italian fallbacks
  const labels = {
    formTitle: content.formTitle || 'Scrivici!',
    formSubtitle: content.formSubtitle || 'Compila il modulo sottostante',
    disabledTitle: content.disabledTitle || 'Contattaci',
    disabledMessage: content.disabledMessage || 'Il modulo di contatto non è attualmente disponibile. Contattaci direttamente via email.',
    checkIn: content.checkIn || 'Data di Check-in',
    checkOut: content.checkOut || 'Data di Check-out',
    selectDate: content.selectDate || 'Seleziona data',
    name: content.name || 'Nome Completo',
    namePlaceholder: content.namePlaceholder || 'Mario Rossi',
    email: content.email || 'Email',
    emailPlaceholder: content.emailPlaceholder || 'mario.rossi@example.com',
    guests: content.guests || 'Numero di Ospiti',
    guestsPlaceholder: content.guestsPlaceholder || '2',
    message: content.message || 'Richieste Speciali',
    messagePlaceholder: content.messagePlaceholder || 'Eventuali richieste speciali...',
    submit: content.submit || 'Invia Richiesta',
    submitting: content.submitting || 'Invio in corso...',
    successMessage: content.successMessage || 'Richiesta inviata con successo!',
    errorMessage: content.errorMessage || "Errore nell'invio della richiesta",
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    message: ''
  });

  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const bookingData = {
      ...formData,
      website: new FormData(e.currentTarget).get('website') || '',
      checkIn: checkIn ? checkIn.toISOString() : null,
      checkOut: checkOut ? checkOut.toISOString() : null,
      submitDate: new Date().toISOString()
    };

    try {
      if (!webhookUrl) {
        throw new Error('Contact form webhook URL not configured');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error(labels.errorMessage);
      }

      alert(labels.successMessage);
      // Reset form
      setFormData({ name: '', email: '', guests: '', message: '' });
      setCheckIn(null);
      setCheckOut(null);
    } catch (error) {
      alert(labels.errorMessage + ': ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();

  // If form is disabled in config, show a message
  if (!formEnabled) {
    return (
      <div className="w-full max-w-4xl mx-auto py-6 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle>{labels.disabledTitle}</CardTitle>
            <CardDescription>
              {labels.disabledMessage}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-6 md:p-6">
      <Card>
        <CardHeader>
          <CardTitle>{labels.formTitle}</CardTitle>
          <CardDescription>
            {labels.formSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div hidden aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{labels.checkIn}</Label>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {checkIn ? checkIn.toLocaleDateString('it-IT', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : labels.selectDate}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={(date) => {
                        setCheckIn(date);
                        setCheckInOpen(false);
                      }}
                      disabled={(date) =>
                        date < today || (checkOut && date >= checkOut)
                      }

                      weekStartsOn={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>{labels.checkOut}</Label>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      {checkOut ? checkOut.toLocaleDateString('it-IT', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : labels.selectDate}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={(date) => {
                        setCheckOut(date);
                        setCheckOutOpen(false);
                      }}
                      disabled={(date) =>
                        date < today || (checkIn && date <= checkIn)
                      }
                      weekStartsOn={1}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{labels.name}</Label>
                <Input
                  id="name"
                  name="name"
                  maxLength={120}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={labels.namePlaceholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{labels.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={254}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={labels.emailPlaceholder}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">{labels.guests}</Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="20"
                step="1"
                value={formData.guests}
                onChange={handleInputChange}
                required
                placeholder={labels.guestsPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{labels.message}</Label>
              <Textarea
                id="message"
                name="message"
                maxLength={5000}
                value={formData.message}
                onChange={handleInputChange}
                className="h-24"
                placeholder={labels.messagePlaceholder}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? labels.submitting : labels.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarForm;
