
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceApi, ServiceItem } from '../../services/services-api';

interface ServicePresentation {
  image: string;
  imageAlt: string;
  subtitle: string;
  features: string[];
  exampleTitle: string;
  exampleDescription: string;
  technologies: string[];
  process: string[];
}

const SERVICE_PRESENTATIONS: Record<number, ServicePresentation> = {
  1: {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    imageAlt: 'Web development workspace with code',
    subtitle: 'Building powerful and responsive web applications.',
    features: [
      'Responsive website development',
      'Modern Angular applications',
      'Performance optimization',
      'REST API integration'
    ],
    exampleTitle: 'Modern Business Website',
    exampleDescription:
      'An example of a professional business website with responsive pages, service sections, contact forms and dynamic content.',
    technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'REST API'],
    process: [
      'Requirements analysis',
      'Interface development',
      'API integration',
      'Testing and delivery'
    ]
  },

  2: {
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200',
    imageAlt: 'Creative interface design workspace',
    subtitle: 'Creating intuitive and attractive digital experiences.',
    features: [
      'User interface design',
      'User experience optimization',
      'Responsive layouts',
      'Visual identity consistency'
    ],
    exampleTitle: 'E-commerce Interface Design',
    exampleDescription:
      'An example of a modern online shopping interface with product cards, clear navigation, attractive layouts and a smooth user journey.',
    technologies: ['Figma', 'UI Design', 'UX Design', 'HTML5', 'CSS3'],
    process: [
      'User research',
      'Wireframe creation',
      'Visual design',
      'Responsive adaptation'
    ]
  },

  3: {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
    imageAlt: 'Digital dashboard and deployment analytics',
    subtitle: 'Deploying applications and making them accessible online.',
    features: [
      'Application deployment',
      'Server configuration',
      'Production environment setup',
      'Application monitoring'
    ],
    exampleTitle: 'Cloud Application Deployment',
    exampleDescription:
      'An example of deploying a web application to a cloud hosting platform, configuring its production environment and making it accessible online.',
    technologies: ['Node.js', 'Git', 'Render', 'Docker', 'Cloud Hosting'],
    process: [
      'Environment preparation',
      'Application configuration',
      'Production deployment',
      'Monitoring and maintenance'
    ]
  },

  4: {
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200',
    imageAlt: 'Cybersecurity and digital protection',
    subtitle: 'Protecting applications and securing API access.',
    features: [
      'JWT authentication testing',
      'Access token validation',
      'Protected route verification',
      'Unauthorized access testing'
    ],
    exampleTitle: 'JWT Protected API',
    exampleDescription:
      'An example of a secure web application where users authenticate with JWT tokens. Protected API endpoints verify the token before allowing access to sensitive resources.',
    technologies: ['JWT', 'Node.js', 'Express', 'Postman', 'REST API'],
    process: [
      'Authentication configuration',
      'Token generation',
      'Protected endpoint testing',
      'Security verification'
    ]
  }
};

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './service-details.html',
  styleUrl: './service-details.css',
})
export class ServiceDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private serviceApi = inject(ServiceApi);

  service = signal<ServiceItem | null>(null);
  presentation = signal<ServicePresentation | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!Number.isInteger(id) || id <= 0) {
        this.errorMessage.set('Invalid service identifier.');
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.errorMessage.set('');
      this.service.set(null);
      this.presentation.set(null);

      this.serviceApi.getServiceById(id).subscribe({
        next: (response) => {
          if (!response.success || !response.data) {
            this.errorMessage.set('Service not found.');
            this.loading.set(false);
            return;
          }

          this.service.set(response.data);
          this.presentation.set(
            SERVICE_PRESENTATIONS[response.data.id] ??
            SERVICE_PRESENTATIONS[1]
          );

          this.loading.set(false);
        },
        error: (error) => {
          console.error('Erreur API :', error);
          this.errorMessage.set('Service not found or unavailable.');
          this.loading.set(false);
        },
      });
    });
  }
}
