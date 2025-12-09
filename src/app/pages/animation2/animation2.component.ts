import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface MenuItem {
  id: number;
  label: string;
  image: string;
  top: number;
  left: number;
  contentTitle: string;
  contentBody: string;
}

@Component({
  selector: 'app-animation2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animation2.component.html',
  styleUrl: './animation2.component.scss',
  animations: [
    trigger('menuItemHover', [
      state('normal', style({ width: '145px', height: '157px', top: '15px', left: '15px', zIndex: 6 })),
      state('hover', style({ width: '165px', height: '177px', top: '5px', left: '5px', zIndex: 8 })),
      transition('normal <=> hover', animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)')) // easeOutBack
    ]),
    trigger('menuItemText', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden <=> visible', animate('300ms ease-out'))
    ]),
    trigger('contentTransition', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('600ms ease-in', style({ opacity: 0, transform: 'scale(0.8)' }))
      ])
    ]),
    trigger('menuContainer', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(-100%)', display: 'none' })),
      transition('visible => hidden', animate('1000ms ease-in')),
      transition('hidden => visible', animate('1000ms ease-out'))
    ]),
    trigger('logoPosition', [
      state('center', style({ top: '184px', left: '329px' })),
      state('corner', style({ top: '-16px', left: '44px' })),
      transition('center => corner', animate('600ms 1000ms cubic-bezier(0.6, -0.28, 0.735, 0.045)')), // Wait 1000ms (menu hide) then move
      transition('corner => center', animate('600ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'))
    ])
  ]
})
export class Animation2Component {
  menuItems: MenuItem[] = [
    {
      id: 1,
      label: 'Combinación Perfecta',
      image: 'nav1.png',
      top: 105,
      left: 304,
      contentTitle: '✨ Combinación Perfecta',
      contentBody: '¡Feliz cumpleaños! 🥂 Siempre he pensado que eres la <b>combinación perfecta</b>. Eres la prueba viviente de que se puede ser increíblemente <i>inteligente</i> 🧠 y deslumbrantemente <i>hermosa</i> 🌹 al mismo tiempo. Gracias por ser esa gran amiga que inspira a todos. ¡Que tengas un día tan <b>brillante</b> como tu mente! ✨'
    },
    {
      id: 2,
      label: 'Amiga Brillante',
      image: 'nav2.png',
      top: 239,
      left: 230,
      contentTitle: '💖 Amiga Brillante',
      contentBody: 'Tener una amiga bonita es genial, pero tener una que además es <b>brillante</b>, es un verdadero privilegio 💡. Admiro mucho cómo piensas y la mujer en la que te has convertido. Te deseo un año lleno de éxitos a la altura de tu talento. <b>¡Te quiero mucho!</b> 🎁'
    },
    {
      id: 3,
      label: 'Mente y Corazón',
      image: 'nav3.png',
      top: 372,
      left: 304,
      contentTitle: '🌹 Mente y Corazón',
      contentBody: 'Hoy celebra la vida una de las mujeres más completas que conozco: <b>mente brillante</b> y <b>corazón de oro</b> 💛. Gracias por tu amistad incondicional. ¡Feliz cumpleaños, guapísima! 🎉'
    },
    {
      id: 4,
      label: 'Lo Tienes Todo',
      image: 'nav4.png',
      top: 372,
      left: 458,
      contentTitle: '👑 Lo Tienes Todo',
      contentBody: 'Inteligente, divertida, preciosa y encima una gran amiga... <b>¡Oye, deja algo para las demás!</b> 😂 Feliz cumpleaños a mi persona favorita. Espero que hoy te consientan tanto como te mereces. 🎂🎈'
    },
    {
      id: 5,
      label: 'Tu Inteligencia',
      image: 'nav5.png',
      top: 239,
      left: 536,
      contentTitle: '🦋 Belleza e Inteligencia',
      contentBody: 'Admiro tu capacidad para resolver problemas y tu <b>elegancia</b> para enfrentar la vida. Tu belleza no es solo lo que vemos por fuera, sino esa <i>inteligencia y bondad</i> que irradias ✨. Estoy orgulloso de ser tu amigo. <b>¡Felicidades hoy y siempre!</b> 🚀'
    },
    {
      id: 6,
      label: 'Valiosa y Radiante',
      image: 'nav6.png',
      top: 105,
      left: 458,
      contentTitle: '☀️ Valiosa y Radiante',
      contentBody: 'En este día especial, quiero recordarte lo <b>valiosa</b> que eres. Tu inteligencia hace mis días más interesantes y tu belleza (por dentro y por fuera) los hace más alegres. Gracias por ser esa gran amiga en la que siempre puedo confiar. <b>¡Feliz vuelta al sol!</b> 🌻✨'
    }
  ];

  activeItem: MenuItem | null = null;
  hoveredItemId: number | null = null;
  isMenuVisible = true;
  scale = 1;
  transformStyle = 'translate(-50%, -50%) scale(1)';

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    // Base dimensions with some padding
    const baseWidth = 966;
    const baseHeight = 750;

    const scaleX = window.innerWidth / baseWidth;
    const scaleY = window.innerHeight / baseHeight;

    // Scale down if smaller, but don't scale up beyond 1 (optional, but keeps it crisp)
    // Or allow scaling up? Let's stick to fitting.
    this.scale = Math.min(scaleX, scaleY, 1);

    // If you want it to always fill (responsive up and down):
    // this.scale = Math.min(scaleX, scaleY);

    this.transformStyle = `translate(-50%, -50%) scale(${this.scale})`;
  }

  onMouseEnter(id: number) {
    if (this.isMenuVisible) {
      this.hoveredItemId = id;
    }
  }

  onMouseLeave() {
    this.hoveredItemId = null;
  }

  selectItem(item: MenuItem) {
    this.isMenuVisible = false;
    setTimeout(() => {
      this.activeItem = item;
    }, 600); // Wait for menu hide animation
  }

  closeContent() {
    this.activeItem = null;
    setTimeout(() => {
      this.isMenuVisible = true;
    }, 100);
  }

}
