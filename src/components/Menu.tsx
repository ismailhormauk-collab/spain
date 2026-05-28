'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────
type PizzaItem = {
  name: string
  ingredients: string
  grande: string
  mediana?: string
  tag?: string
}

type DishItem = {
  name: string
  description: string
  price: string
  tag?: string
}

type DrinkItem = {
  name: string
  price: string
  note?: string
}

// ────────────────────────────────────────────
// MENU DATA — extracted from real menu photos
// ────────────────────────────────────────────

const pizzas: PizzaItem[] = [
  { name: 'Tejana',              ingredients: 'Tomate, mozzarella, salsa barbacoa y pollo',                                       grande: '13,50€', mediana: '11,50€', tag: 'Favorita' },
  { name: 'Margarita',           ingredients: 'Tomate y mozzarella',                                                              grande: '11,50€', mediana: '9,50€'  },
  { name: 'Romana',              ingredients: 'Tomate, mozzarella, alcaparras, anchoas y aceitunas',                              grande: '13,50€', mediana: '11,50€' },
  { name: 'Proscuito & Funghi',  ingredients: 'Tomate, mozzarella, jamón y champiñones',                                         grande: '12,50€', mediana: '10,50€' },
  { name: 'Cuatro Estaciones',   ingredients: 'Tomate, mozzarella, alcachofas, jamón, champiñones y aceitunas',                  grande: '13,50€', mediana: '11,50€' },
  { name: 'Carne Picada',        ingredients: 'Tomate, mozzarella, carne picada y salsa barbacoa',                               grande: '13,50€', mediana: '11,50€' },
  { name: 'Caprichosa',          ingredients: 'Tomate, mozzarella, jamón, salami picante, aceitunas, alcachofas y anchoas',      grande: '13,50€', mediana: '11,50€' },
  { name: 'Mare Monte',          ingredients: 'Tomate, mozzarella, champiñones y gambas',                                        grande: '13,50€', mediana: '11,50€' },
  { name: 'Parma',               ingredients: 'Tomate, mozzarella parmesano y jamón serrano',                                    grande: '13,50€', mediana: '11,50€', tag: 'Clásica' },
  { name: 'Cuatro Quesos',       ingredients: 'Mozzarella, emmental, parmesano y roquefort',                                     grande: '13,50€', mediana: '11,50€' },
  { name: 'Bismark',             ingredients: 'Tomate, mozzarella, huevo y jamón',                                               grande: '13,50€', mediana: '11,50€' },
  { name: 'Vegetariana',         ingredients: 'Tomate, mozzarella, pimiento, berenjena, calabacín, champiñones y cebolla',      grande: '13,50€', mediana: '10,50€' },
  { name: 'Calzone',             ingredients: 'Mozzarella, parmesano, tomate y jamón york',                                      grande: '13,50€', mediana: '11,50€' },
  { name: 'Calzone Farcito',     ingredients: 'Tomate, mozzarella, jamón, champiñones, aceitunas y alcachofas',                  grande: '13,50€', mediana: '11,50€' },
  { name: 'Tropical',            ingredients: 'Tomate, kiwi, piña, jamón y mozzarella',                                         grande: '13,50€', mediana: '11,50€' },
  { name: 'Frutti di Mare',      ingredients: 'Tomate, mozzarella y frutti di mare',                                             grande: '15,50€', mediana: '13,00€', tag: 'Mar' },
  { name: 'Pugliese',            ingredients: 'Tomate, mozzarella, bacon y cebolla',                                             grande: '13,50€', mediana: '10,50€' },
  { name: 'Especial de la Casa', ingredients: 'Tomate, mozzarella, soufflé parmesano, jamón, huevo, champiñones y bacon',       grande: '17,00€', mediana: '13,50€', tag: 'Casa' },
  { name: 'Salami Peperonni',    ingredients: 'Tomate, mozzarella, salami picante y orégano',                                   grande: '13,50€', mediana: '11,50€' },
  { name: 'Bacon y Champiñones', ingredients: 'Tomate, mozzarella, bacon y champiñones',                                        grande: '13,00€', mediana: '11,00€' },
  { name: 'Atún y Cebolla',      ingredients: 'Tomate, mozzarella, atún y cebolla',                                             grande: '13,00€', mediana: '11,00€' },
  { name: 'Carbonara',           ingredients: 'Tomate, mozzarella, cebolla, huevo y bacon',                                     grande: '13,00€', mediana: '11,00€' },
  { name: 'La Diavola',          ingredients: 'Tomate, mozzarella, salami picante, pimientos, anchoas y aceitunas',             grande: '13,50€', mediana: '11,50€', tag: 'Picante' },
  { name: 'Genoveses',           ingredients: 'Tomate, mozzarella, huevo, carne picada, pollo, bacon y jamón',                 grande: '14,50€', mediana: '11,50€' },
  { name: 'Rúcola',              ingredients: 'Tomate, mozzarella, rúcola, espinacas, cuatro quesos y cebolla',                grande: '13,50€', mediana: '11,50€' },
  { name: 'Avanti',              ingredients: 'Tomate, mozzarella, salmón, canónigos y rulo de cabra',                         grande: '15,00€', mediana: '13,00€', tag: 'Gourmet' },
  { name: 'Pizza al Gusto 40cm', ingredients: 'Elige tus ingredientes favoritos',                                               grande: '16,50€' },
]

const pasta: DishItem[] = [
  { name: 'Spaghetti Mare Monte',      description: 'Gambas, champiñones, tomate fresco y ajo',                             price: '13,50€', tag: 'Mar' },
  { name: 'Spaghetti a la Boloñesa',   description: 'Carne picada y tomate',                                                price: '12,00€' },
  { name: 'Spaghetti Amatriciana',     description: 'Panceta, cebolla, tomate fresco y parmesano',                         price: '12,50€' },
  { name: 'Spaghetti Carbonara',       description: 'Panceta, huevo y parmesano',                                           price: '12,00€', tag: 'Clásico' },
  { name: 'Spaghetti al Pesto',        description: 'Albahaca, ajo, piñones y parmesano',                                  price: '12,50€' },
  { name: 'Spaghetti Avanti',          description: 'Gambas, cigalas, aceitunas, tomate y ajo',                            price: '15,50€', tag: 'Premium' },
  { name: 'Spaghetti al Pil Pil',      description: 'Gambas, ajo, aceite y guindilla',                                     price: '13,50€' },
  { name: 'Macarrones Arribiata',      description: 'Tomate, ajo, aceitunas, guindilla y perejil',                         price: '10,50€' },
  { name: 'Macarrones al Vodka',       description: 'Vodka, bacon, cebolla, tomate, nata y parmesano',                     price: '12,50€' },
  { name: 'Macarrones Cuatro Quesos',  description: 'Queso holandés, roquefort, emmental y parmesano',                     price: '11,50€' },
  { name: 'Macarrones con Tomate',     description: 'Salsa de tomate casera',                                              price: '8,00€'  },
  { name: 'Tallarines Imperiales',     description: 'Almejas, mejillones, gambas, calamares y tomate fresco',              price: '16,50€', tag: 'Mar' },
  { name: 'Tallarines Funghi Porcini', description: 'Setas, ajo y tomates frescos',                                       price: '13,50€' },
  { name: 'Tallarines a la Bolognesa', description: 'Ragú de carne picada y tomate',                                      price: '10,50€' },
]

const pastafresca: DishItem[] = [
  { name: 'Gnocchi Bolognesa',              description: 'Carne picada y tomate',                                              price: '11,00€', tag: 'Favorito' },
  { name: 'Gnocchi Pesto',                  description: 'Albahaca, ajo, piñones y parmesano',                               price: '11,00€' },
  { name: 'Gnocchi Cuatro Quesos',          description: 'Holandés, roquefort, emmenthal y parmesano',                       price: '11,00€' },
  { name: 'Gnocchi con Gorgonzola y Nueces',description: 'Salsa cremosa de gorgonzola con nueces tostadas',                  price: '12,50€' },
  { name: 'Tortellini Celestina',           description: 'Nata, jamón serrano, champiñones y parmesano',                    price: '12,00€', tag: 'Favorito' },
  { name: 'Tortellini Romana',              description: 'Nata, jamón cocido, cebolla y parmesano',                         price: '12,00€' },
  { name: 'Ravioli de Carne',              description: 'Con salsa bolognesa, pesto, carbonara o cuatro quesos',            price: '13,00€', tag: 'Elección' },
  { name: 'Fagottini',                     description: 'Rellenos de pera con salsa cuatro quesos o gorgonzola',            price: '13,50€', tag: 'Especial' },
  { name: 'Canelones',                     description: 'Rellenos de carne con bechamel gratinada',                         price: '10,50€' },
  { name: 'Berenjenas a la Parmesana',     description: 'Berenjena gratinada con tomate y parmesano',                       price: '10,00€' },
  { name: 'Lasagna de Carne o Vegetariana',description: 'Capas de pasta fresca con ragú o verduras y bechamel',             price: '11,50€' },
]

const entrantes: DishItem[] = [
  { name: 'Provolone',                        description: 'Queso italiano gratinado con hierbas aromáticas',                price: '10,50€' },
  { name: 'Pan de Ajo',                       description: 'Pan crujiente con mantequilla de ajo y perejil',                price: '6,00€'  },
  { name: 'Parrilla de Verdura',              description: 'Selección de verduras de temporada a la plancha',               price: '10,00€' },
  { name: 'Jamón Serrano 150g',               description: 'Jamón serrano ibérico en lonchas finas',                        price: '18,00€', tag: 'Premium' },
  { name: 'Tempura de Verduras y Langostinos',description: 'Verduras y langostinos en tempura ligera y crujiente',          price: '15,00€' },
  { name: 'Huevos Rotos',                     description: 'Huevos fritos sobre patatas y jamón',                           price: '15,00€', tag: 'Favorito' },
  { name: 'Gambas Napolitanas',               description: 'Gambas salteadas con ajo, tomate y orégano',                   price: '12,50€' },
  { name: 'Berenjenas con Miel',              description: 'Berenjenas fritas con miel de caña',                            price: '12,00€' },
  { name: 'Pan',                              description: 'Pan de masa artesanal',                                          price: '0,60€'  },
]

const risottos: DishItem[] = [
  { name: 'Risotto con Funghi',         description: 'Arroz arborio cremoso con setas y parmesano',                          price: '13,00€', tag: 'Favorito' },
  { name: 'Risotto con Frutti di Mare', description: 'Arroz cremoso con almejas, mejillones y gambas del Mediterráneo',     price: '14,50€', tag: 'Mar' },
  { name: 'Risotto con Gambas',         description: 'Arroz cremoso con gambas frescas y vino blanco',                      price: '11,50€' },
  { name: 'Risotto con Verduras',       description: 'Arroz arborio con verduras de temporada y parmesano',                 price: '10,50€' },
]

const carne: DishItem[] = [
  { name: 'Hamburguesa con Huevo y Patatas',   description: 'Burger casera, huevo frito y patatas fritas',                 price: '14,00€' },
  { name: 'Pollo al Horno',                    description: 'Pollo asado al horno con hierbas mediterráneas',              price: '12,00€' },
  { name: 'Pechuga de Pollo a la Plancha',     description: 'Pechuga a la plancha con guarnición de temporada',            price: '15,00€' },
  { name: 'Cordero a la Plancha',              description: 'Chuletas de cordero a la plancha',                            price: '20,00€', tag: 'Premium' },
  { name: 'Lomo Plancha con Huevo y Patatas',  description: 'Lomo de cerdo a la plancha con huevo y patatas fritas',       price: '13,50€' },
  { name: 'Chuletas de Cerdo',                 description: 'Chuletas de cerdo a la plancha con guarnición',               price: '13,50€' },
  { name: 'Costilla de Cerdo con Barbacoa',    description: 'Costillas de cerdo lacadas con salsa barbacoa casera',        price: '13,50€', tag: 'Favorito' },
  { name: 'Parrillada de Carne 2 Personas',   description: 'Selección de carnes a la brasa para compartir',               price: '30,00€', tag: 'Para 2' },
]

const pescado: DishItem[] = [
  { name: 'Dorada a la Plancha 350g',       description: 'Dorada fresca a la plancha con aceite de oliva y limón',         price: '25,00€', tag: 'Fresco' },
  { name: 'Lubina a la Plancha 350g',       description: 'Lubina fresca a la plancha con hierbas aromáticas',             price: '25,00€', tag: 'Fresco' },
  { name: 'Pez Espada a la Plancha',        description: 'Filete de pez espada a la plancha con vinagreta',               price: '25,00€' },
  { name: 'Calamares en Aceite',            description: 'Calamares en su tinta con aceite de oliva virgen extra',        price: '25,50€' },
  { name: 'Calamar a la Plancha 350g',      description: 'Calamar fresco a la plancha con ajo y perejil',                 price: '24,50€' },
  { name: 'Calamares Fritos 350g',          description: 'Calamares rebozados y fritos en aceite de oliva',               price: '24,50€', tag: 'Favorito' },
  { name: 'Parrillada de Pescado',          description: 'Selección de pescados y mariscos frescos a la parrilla',        price: '45,00€', tag: 'Para 2' },
  { name: 'Paella Mixta o Mariscos 2 Pers.',description: 'Paella con arroz y mariscos frescos del Mediterráneo',          price: '30,00€', tag: 'Para 2' },
  { name: 'Sardinas a la Plancha',          description: 'Sardinas frescas a la plancha con sal y limón',                 price: '14,00€' },
  { name: 'Gallopedro',                     description: 'San Pedro fresco a la plancha',                                  price: '25,00€', tag: 'Del día' },
]

const ensaladas: DishItem[] = [
  { name: 'Ensalada de Mar',          description: 'Surtido verde, cangrejo, caracola y langostino',                        price: '15,00€', tag: 'Mar' },
  { name: 'Ensalada de Canónigos',    description: 'Canónigos con queso de cabra y nueces',                                price: '16,00€' },
  { name: 'Ensalada César',           description: 'Pollo, picatostes, queso parmesano y salsa césar',                    price: '15,50€', tag: 'Clásica' },
  { name: 'Ensalada de Langostinos',  description: 'Langostinos, lechuga y queso parmesano',                              price: '14,00€', tag: 'Mar' },
  { name: 'Ensalada Mediterránea',    description: 'Lechuga, tomate, remolacha, maíz, atún, alcaparras y aceitunas',     price: '13,80€' },
  { name: 'Ensalada Avanti',          description: 'Tomate, lechuga, pollo, cebolla y piña',                              price: '13,50€' },
  { name: 'Ensalada de Rúcula',       description: 'Queso parmesano en láminas y vinagre balsámico',                     price: '13,50€' },
  { name: 'Ensalada Normal',          description: 'Tomate, lechuga y cebolla',                                           price: '7,50€'  },
]

const postres: DishItem[] = [
  { name: 'Tiramisú',                    description: 'Elaborado diariamente con mascarpone, café espresso y bizcochos',   price: '5,00€', tag: 'Estrella' },
  { name: 'Tarta de Queso',              description: 'Tarta casera de queso cremoso al horno',                           price: '5,00€' },
  { name: 'Tarta de Chocolate',          description: 'Tarta de chocolate negro con cobertura de cacao puro',            price: '5,00€' },
  { name: 'Creps de Chocolate o Fresa',  description: 'Creps caseros con chocolate caliente o coulis de fresa',         price: '4,50€' },
  { name: 'Tarta de Manzana',            description: 'Tarta tradicional de manzana con canela',                          price: '5,00€' },
  { name: 'Flan',                        description: 'Flan casero de huevo con caramelo',                                price: '3,50€' },
]

const bebidas: DrinkItem[] = [
  { name: 'Sangría 1L',      price: '12,50€' },
  { name: 'Tinto de Verano 1L', price: '10,00€' },
  { name: 'Cerveza 1L',      price: '10,50€' },
  { name: 'Copa de Vino',    price: '2,80€'  },
  { name: 'Caña',            price: '2,00€'  },
  { name: 'Tubo',            price: '2,50€'  },
  { name: '1/3 de Cerveza',  price: '3,00€'  },
  { name: '1/3 Alhambra 1925', price: '3,50€' },
  { name: '1/2L Jarra',      price: '3,80€'  },
  { name: 'Agua 1,5L',       price: '2,50€'  },
  { name: 'Zumos',           price: '2,00€'  },
]

const vinos: DrinkItem[] = [
  { name: 'Blanco Verdejo',      price: '12,00€', note: 'Rueda · Botella'           },
  { name: 'Rivera del Duero',    price: '15,00€', note: 'Ribera del Duero · Botella' },
  { name: 'Bosquet de Almería',  price: '15,00€', note: 'D.O. Almería · Botella'    },
]

const licores: DrinkItem[] = [
  { name: 'J&B con Refresco',      price: '6,00€' },
  { name: 'Ginebra con Refresco',  price: '6,00€' },
  { name: 'Ron con Refresco',      price: '6,00€' },
  { name: 'Vodka con Refresco',    price: '6,00€' },
  { name: 'Anís (copa)',           price: '2,50€' },
  { name: 'Coñac (copa)',          price: '2,50€' },
  { name: 'Vermut',               price: '3,00€' },
  { name: 'Pacharán (copa)',       price: '3,50€' },
]

const cafes: DrinkItem[] = [
  { name: 'Café Solo',      price: '1,10€' },
  { name: 'Café con Leche', price: '1,40€' },
  { name: 'Cappuccino',     price: '1,40€' },
  { name: 'Cortado',        price: '1,30€' },
  { name: 'Carajillo',      price: '1,70€' },
  { name: 'Café Bombón',    price: '1,50€' },
  { name: 'Infusiones',     price: '1,30€' },
  { name: 'Cola-Cao',       price: '1,60€' },
  { name: 'Manchada',       price: '1,40€' },
]

const CATS = [
  { id: 'pizzas',      label: 'Pizzas',       icon: '🍕', type: 'pizza'  as const },
  { id: 'pasta',       label: 'Pasta',        icon: '🍝', type: 'dish'   as const },
  { id: 'pastafresca', label: 'Pasta Fresca', icon: '🥟', type: 'dish'   as const },
  { id: 'entrantes',   label: 'Entrantes',    icon: '🥗', type: 'dish'   as const },
  { id: 'risottos',    label: 'Risottos',     icon: '🍚', type: 'dish'   as const },
  { id: 'carne',       label: 'Carne',        icon: '🥩', type: 'dish'   as const },
  { id: 'pescado',     label: 'Pescado',      icon: '🐟', type: 'dish'   as const },
  { id: 'ensaladas',   label: 'Ensaladas',    icon: '🥬', type: 'dish'   as const },
  { id: 'postres',     label: 'Postres',      icon: '🍮', type: 'dish'   as const },
  { id: 'bebidas',     label: 'Bebidas',      icon: '🍺', type: 'drink'  as const },
  { id: 'vinos',       label: 'Vinos',        icon: '🍷', type: 'drink'  as const },
  { id: 'licores',     label: 'Licores',      icon: '🥃', type: 'drink'  as const },
  { id: 'cafes',       label: 'Cafés',        icon: '☕', type: 'drink'  as const },
]

const DATA: Record<string, DishItem[] | PizzaItem[] | DrinkItem[]> = {
  pizzas, pasta, pastafresca, entrantes, risottos, carne, pescado, ensaladas, postres,
  bebidas, vinos, licores, cafes,
}

function half<T>(arr: T[]): [T[], T[]] {
  const mid = Math.ceil(arr.length / 2)
  return [arr.slice(0, mid), arr.slice(mid)]
}

// ── Row component for food dishes ──
function DishRow({ item, index, colOffset = 0 }: { item: DishItem; index: number; colOffset?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: ((index + colOffset) % 10) * 0.03 }}
      className="group border-b border-white/5 last:border-0 py-[18px] hover:border-oro/12 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2 min-w-0">
          <h3 className="font-playfair font-medium text-[15px] leading-snug text-hueso group-hover:text-oro transition-colors duration-300">
            {item.name}
          </h3>
          {item.tag && (
            <span className="hidden sm:inline font-raleway text-[8.5px] uppercase tracking-[0.2em] text-oro/55 font-bold">
              {item.tag}
            </span>
          )}
        </div>
        <span className="font-raleway text-[13px] font-bold text-oro flex-shrink-0 ml-3">
          {item.price}
        </span>
      </div>
      {item.description && (
        <p className="font-playfair italic text-[11.5px] text-hueso-muted mt-[3px] leading-relaxed">
          {item.description}
        </p>
      )}
    </motion.div>
  )
}

// ── Row component for pizzas (dual pricing) ──
function PizzaRow({ item, index, colOffset = 0 }: { item: PizzaItem; index: number; colOffset?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay: ((index + colOffset) % 10) * 0.03 }}
      className="group border-b border-white/5 last:border-0 py-[18px] hover:border-oro/12 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left: name + ingredients */}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="font-playfair font-medium text-[15px] leading-snug text-hueso group-hover:text-oro transition-colors duration-300">
              {item.name}
            </h3>
            {item.tag && (
              <span className="hidden sm:inline font-raleway text-[8.5px] uppercase tracking-[0.2em] text-oro/55 font-bold">
                {item.tag}
              </span>
            )}
          </div>
          <p className="font-playfair italic text-[11.5px] text-hueso-muted mt-[3px] leading-relaxed">
            {item.ingredients}
          </p>
        </div>
        {/* Right: prices */}
        <div className="flex-shrink-0 text-right space-y-[2px]">
          <div className="flex items-center justify-end gap-1.5">
            <span className="font-raleway text-[8.5px] text-hueso-muted tracking-wide">40cm</span>
            <span className="font-raleway text-[13px] font-bold text-oro">{item.grande}</span>
          </div>
          {item.mediana && (
            <div className="flex items-center justify-end gap-1.5">
              <span className="font-raleway text-[8.5px] text-hueso-muted tracking-wide">30cm</span>
              <span className="font-raleway text-[13px] font-semibold text-hueso-dark">{item.mediana}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Row component for drinks ──
function DrinkRow({ item, index }: { item: DrinkItem; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: (index % 12) * 0.025 }}
      className="group flex items-baseline justify-between py-3 border-b border-white/5 last:border-0 hover:border-oro/10 transition-colors duration-300 cursor-default"
    >
      <div className="flex items-baseline gap-2 min-w-0">
        <span className="font-raleway text-sm text-hueso group-hover:text-oro-light transition-colors duration-300">
          {item.name}
        </span>
        {item.note && (
          <span className="font-raleway text-[9.5px] text-hueso-muted italic">{item.note}</span>
        )}
      </div>
      <span className="font-raleway text-sm font-bold text-oro ml-4 flex-shrink-0">{item.price}</span>
    </motion.div>
  )
}

// ── Main Menu component ──
export default function Menu() {
  const [activeTab, setActiveTab] = useState('pizzas')
  const sectionRef = useRef(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const activeCat = CATS.find(c => c.id === activeTab)!

  const scrollTabIntoView = (id: string) => {
    setActiveTab(id)
    const el = tabsRef.current?.querySelector(`[data-tab="${id}"]`) as HTMLElement
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  return (
    <section id="menu" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-carbon to-[#0d0d0d]" />

      {/* Faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#c9a96e 1px, transparent 1px), linear-gradient(90deg, #c9a96e 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <span className="section-tag">Nuestra Carta</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-hueso text-center font-bold mb-3 leading-tight"
        >
          Carta Completa
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-raleway text-hueso-muted text-center text-sm max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Pizzas artesanales, pasta fresca y los sabores más auténticos del Mediterráneo — elaborados con ingredientes frescos y pasión italiana.
        </motion.p>

        {/* ── Tab Navigation ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div
            ref={tabsRef}
            className="flex gap-0 border-b border-white/8 overflow-x-auto"
            style={{ scrollbarWidth: 'none' }}
          >
            {CATS.map(cat => (
              <button
                key={cat.id}
                data-tab={cat.id}
                onClick={() => scrollTabIntoView(cat.id)}
                className={`relative flex-shrink-0 flex items-center gap-1.5 font-raleway text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-3 transition-colors duration-300 ${
                  activeTab === cat.id
                    ? 'text-oro'
                    : 'text-hueso-muted hover:text-hueso'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                {cat.label}
                {/* Active underline */}
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-oro"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Content Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── Category title ── */}
            <div className="flex flex-col items-center mb-8 gap-3">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-oro/50" />
                <span className="text-2xl">{activeCat.icon}</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-oro/50" />
              </div>
              <h3 className="font-playfair text-2xl font-bold text-oro tracking-[0.12em] uppercase">
                {activeCat.label}
              </h3>

              {/* Pizza size legend */}
              {activeCat.type === 'pizza' && (
                <div className="flex items-center gap-6 mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-raleway text-[9px] uppercase tracking-widest text-hueso-muted">Grande</span>
                    <span className="font-raleway text-[9px] text-oro font-semibold">40 cm</span>
                  </div>
                  <div className="w-px h-3 bg-white/15" />
                  <div className="flex items-center gap-1.5">
                    <span className="font-raleway text-[9px] uppercase tracking-widest text-hueso-muted">Mediana</span>
                    <span className="font-raleway text-[9px] text-hueso-dark font-semibold">30 cm</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── PIZZA: 2-column grid ── */}
            {activeCat.type === 'pizza' && (() => {
              const [left, right] = half(DATA[activeTab] as PizzaItem[])
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="lg:pr-8 lg:border-r lg:border-white/5">
                    {left.map((item, i) => <PizzaRow key={item.name} item={item} index={i} />)}
                  </div>
                  <div className="lg:pl-8">
                    {right.map((item, i) => <PizzaRow key={item.name} item={item} index={i} colOffset={left.length} />)}
                  </div>
                </div>
              )
            })()}

            {/* ── DISH: 2-column grid ── */}
            {activeCat.type === 'dish' && (() => {
              const [left, right] = half(DATA[activeTab] as DishItem[])
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="lg:pr-8 lg:border-r lg:border-white/5">
                    {left.map((item, i) => <DishRow key={item.name} item={item} index={i} />)}
                  </div>
                  <div className="lg:pl-8">
                    {right.map((item, i) => <DishRow key={item.name} item={item} index={i} colOffset={left.length} />)}
                  </div>
                </div>
              )
            })()}

            {/* ── DRINKS: centered single column ── */}
            {activeCat.type === 'drink' && (
              <div className="max-w-lg mx-auto">
                {(DATA[activeTab] as DrinkItem[]).map((item, i) => (
                  <DrinkRow key={item.name} item={item} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mt-16"
        >
          <button
            onClick={() => document.querySelector('#reservas')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            <span>Reservar Mesa</span>
          </button>
          <a href="tel:+34610091689" className="btn-outline text-center">
            Llamar Ahora
          </a>
        </motion.div>

        <p className="text-center font-raleway text-[11px] text-hueso-muted mt-5 opacity-60">
          Precios con IVA incluido · Carta sujeta a disponibilidad de temporada · Consulte alérgenos con nuestro equipo
        </p>
      </div>
    </section>
  )
}
