import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { INITIAL_COFFEE_CATALOG } from '../constants/catalog';
import { BACKEND_TO_LOCAL_IMAGE_MAP } from '../constants/images';
import { COMPANY_LOCATIONS_LIST } from '../constants/locations';

interface StoredRequest {
  id: string;
  referenceNumber: string;
  buyerId?: string;
  status: string;
  formData: any;
  timeline: Array<{ status: string; message: string; timestamp: string }>;
  matchedCoffeeIds?: string[];
  staffNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory persistent array for requests during server lifetime
const storedRequests: StoredRequest[] = [
  {
    id: 'seed-req-001',
    referenceNumber: 'MGG-2026-0001',
    buyerId: 'user-buyer-001',
    status: 'Quote Prepared',
    formData: {
      origin: 'Guji',
      processing: 'Sun-Dried / Natural',
      grade: 'Grade 1',
      minCupScore: '86+',
      quantityType: 'Containers',
      quantityValue: '1 Container',
      destinationCountry: 'Germany',
      destinationPort: 'Hamburg',
      companyName: 'Hanseatic Coffee Importers GmbH',
      buyerName: 'Lukas Weber',
      email: 'buyer@sample.com',
      phoneWhatsApp: '+49 40 12345678',
      country: 'Germany',
      additionalNotes: 'Inquiring for upcoming main harvest delivery. Looking for bright stone fruit profile.'
    },
    timeline: [
      {
        status: 'Submitted',
        message: 'Your coffee request has been received by Mesfin Girma Gemeda export desk.',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString()
      },
      {
        status: 'Under Review',
        message: 'Coffee specification reviewed and matched with Guji highland natural lots.',
        timestamp: new Date(Date.now() - 3600000 * 36).toISOString()
      },
      {
        status: 'Quote Prepared',
        message: 'Proforma quotation and export lot specifications sent to buyer email.',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString()
      }
    ],
    matchedCoffeeIds: ['mgg-guji-natural-g1'],
    staffNotes: 'High priority German importer. Sample lot 100g green dispatched via courier.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'seed-req-002',
    referenceNumber: 'MGG-2026-0002',
    buyerId: 'user-buyer-001',
    status: 'Under Review',
    formData: {
      origin: 'Yirgacheffe',
      processing: 'Washed',
      grade: 'Grade 1',
      minCupScore: '87+',
      quantityType: 'Containers',
      quantityValue: '2 Containers',
      destinationCountry: 'Germany',
      destinationPort: 'Hamburg',
      companyName: 'Hanseatic Coffee Importers GmbH',
      buyerName: 'Lukas Weber',
      email: 'buyer@sample.com',
      phoneWhatsApp: '+49 40 12345678',
      country: 'Germany',
      additionalNotes: 'Need floral, bergamot-forward Grade 1 lot from company farm site.'
    },
    timeline: [
      {
        status: 'Submitted',
        message: 'Your coffee request has been received.',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        status: 'Under Review',
        message: 'Export manager is evaluating lot availability at Yirgacheffe washing station.',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString()
      }
    ],
    matchedCoffeeIds: ['mgg-yirgacheffe-washed-g1'],
    staffNotes: 'Evaluating washing station lot allocation. Container staging ready.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString()
  }
];

export function apiPlugin(): Plugin {
  return {
    name: 'mgg-api-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url || '';
        const cleanUrl = rawUrl.split('?')[0];

        // Handle image requests with decoded characters and backend mappings
        if (cleanUrl.toLowerCase().startsWith('/images/')) {
          const decodedPath = decodeURIComponent(cleanUrl);
          const mappedPath = BACKEND_TO_LOCAL_IMAGE_MAP[decodedPath] || decodedPath;
          const diskPath = path.resolve(process.cwd(), 'public', mappedPath.replace(/^\//, ''));

          if (fs.existsSync(diskPath) && fs.statSync(diskPath).isFile()) {
            res.setHeader('Content-Type', 'image/jpeg');
            res.setHeader('Cache-Control', 'public, max-age=86400');
            fs.createReadStream(diskPath).pipe(res);
            return;
          }
        }

        const url = rawUrl;

        // Handle GET /api/locations
        if (url === '/api/locations' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ locations: COMPANY_LOCATIONS_LIST }));
          return;
        }

        // Handle POST /api/match
        if (url === '/api/match' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const requirements = JSON.parse(body || '{}');
              const origin = requirements.origin;
              const processing = requirements.processing;
              const grade = requirements.grade;

              const matches = INITIAL_COFFEE_CATALOG.filter((coffee) => {
                if (origin && origin !== 'Not sure' && origin !== 'Other Ethiopia') {
                  if (coffee.origin.toLowerCase() !== origin.toLowerCase()) return false;
                }
                if (processing && processing !== 'Either') {
                  if (!coffee.processingMethod.toLowerCase().includes(processing.toLowerCase())) {
                    return false;
                  }
                }
                if (grade && grade === 'Grade 1') {
                  if (coffee.grade !== 'Grade 1') return false;
                }
                return true;
              });

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ matches }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid match payload' }));
            }
          });
          return;
        }

        // Handle GET /api/requests (all requests)
        if (url === '/api/requests' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ requests: storedRequests }));
          return;
        }

        // Handle POST /api/requests (create new request)
        if (url === '/api/requests' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body || '{}');
              if (!payload.referenceNumber || !payload.formData) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing referenceNumber or formData' }));
                return;
              }

              const newReq: StoredRequest = {
                id: payload.id || `req-${Date.now()}`,
                referenceNumber: payload.referenceNumber,
                buyerId: payload.buyerId,
                status: payload.status || 'Submitted',
                formData: payload.formData,
                timeline: payload.timeline || [
                  {
                    status: 'Submitted',
                    message: 'Your coffee request has been received.',
                    timestamp: new Date().toISOString()
                  }
                ],
                matchedCoffeeIds: payload.matchedCoffeeIds || [],
                staffNotes: payload.staffNotes || '',
                createdAt: payload.createdAt || new Date().toISOString(),
                updatedAt: payload.updatedAt || new Date().toISOString()
              };

              storedRequests.unshift(newReq);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, request: newReq }));
            } catch (err: any) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to process request' }));
            }
          });
          return;
        }

        // Handle GET /api/requests/:reference
        if (url.startsWith('/api/requests/') && req.method === 'GET') {
          const reference = decodeURIComponent(url.replace('/api/requests/', '').split('?')[0]).trim().toUpperCase();
          const found = storedRequests.find((r) => r.referenceNumber.toUpperCase() === reference);

          res.setHeader('Content-Type', 'application/json');
          if (found) {
            res.end(JSON.stringify({ success: true, request: found }));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ success: false, error: 'Request not found.' }));
          }
          return;
        }

        // Handle PATCH /api/requests/:reference (status/notes updates)
        if (url.startsWith('/api/requests/') && (req.method === 'PATCH' || req.method === 'PUT')) {
          const reference = decodeURIComponent(url.replace('/api/requests/', '').split('?')[0]).trim().toUpperCase();
          const index = storedRequests.findIndex((r) => r.referenceNumber.toUpperCase() === reference);

          if (index === -1) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: 'Request not found' }));
            return;
          }

          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const updates = JSON.parse(body || '{}');
              storedRequests[index] = {
                ...storedRequests[index],
                ...updates,
                updatedAt: new Date().toISOString()
              };

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, request: storedRequests[index] }));
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid update payload' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}
