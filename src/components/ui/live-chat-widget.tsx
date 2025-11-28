'use client';

import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="fixed bottom-24 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        aria-label="Live chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window (UI Only) */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-50 w-80 sm:w-96 rounded-lg border bg-background shadow-2xl">
          <div className="flex items-center justify-between border-b bg-primary p-4 text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Live Support</h3>
                <p className="text-xs opacity-90">We're here to help!</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-64 p-4 overflow-y-auto bg-muted/20">
            <div className="flex flex-col gap-3">
              {/* Bot Message */}
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="rounded-lg bg-background p-3 shadow-sm text-sm">
                    <p>Hi! 👋 Welcome to ShopHub!</p>
                    <p className="mt-2">How can we help you today?</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Just now</p>
                </div>
              </div>

              {/* Quick Options */}
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" size="sm" className="justify-start text-left h-auto py-2">
                  🚚 Track my order
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-left h-auto py-2">
                  💳 Payment & refunds
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-left h-auto py-2">
                  📦 Product information
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-left h-auto py-2">
                  💬 Talk to an agent
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                disabled
              />
              <Button size="sm" disabled>
                Send
              </Button>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              This is a demo chat widget
            </p>
          </div>
        </div>
      )}
    </>
  );
}
