import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';

export const stepper = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
      }),
    ]),
    group([
      query(':enter', [
        animate(
          '2000ms ease',
          keyframes([
            style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
            style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
            style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
          ])
        ),
      ]),
      query(':leave', [
        animate(
          '2000ms ease',
          keyframes([
            style({ transform: 'scale(1)', offset: 0 }),
            style({
              transform: 'scale(0.5) translateX(-25%) rotate(0)',
              offset: 0.35,
            }),
            style({
              opacity: 0,
              transform: 'translateX(-50%) rotate(-180deg) scale(6)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ]),
]);

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction: any) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          [direction]: 0,
          transition: '0.50s',
          width: '100%',
          opacity: 1,
        }),
      ],
      optional
    ),
    query(':enter', [
      style({ [direction]: '-100%', transition: '0.50s', opacity: 1 }),
    ]),
    group([
      query(
        ':leave',
        [
          animate(
            '800ms ease',
            style({ [direction]: '100%', transition: '0.50s', opacity: 1 })
          ),
        ],
        optional
      ),
      query(':enter', [
        animate(
          '800ms ease',
          style({ [direction]: '0%', transition: '0.50s', opacity: 1 })
        ),
      ]),
    ]),
  ];
}
export const fader = trigger('routeAnimations', [
  transition('* <=> *', [
    transition('* <=> *', [
      /* order */

      /* 1 */ query(
        ':enter, :leave',
        style({ position: 'fixed', width: '100%' }),

        { optional: true }
      ),

      /* 2 */ group([
        // block executes in parallel

        query(
          ':enter',
          [
            style({ transform: 'translateX(100%)' }),

            animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' })),
          ],
          { optional: true }
        ),

        query(
          ':leave',
          [
            style({ transform: 'translateX(0%)' }),

            animate(
              '0.3s ease-in-out',
              style({ transform: 'translateX(-100%)' })
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]),
]);
