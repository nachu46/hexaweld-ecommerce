const products = [
    // ─── TORK® (Electricals, Power Tools & Accessories) ─────────────────────
    {
        name: 'Tork® 18V Cordless Lithium-Ion Drill Set',
        description: 'Professional 18V heavy-duty cordless drill kit equipped with high-torque motor, dual speed selector, LED work light, and 100+ piece accessory bit set.',
        brand: 'Tork',
        category: 'Electricals, Power Tools & Accessories',
        SKU: 'TORK-CD18V',
        barcode: '6948271000101',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 50,
        tags: ['Power Tools', 'Cordless Drill', 'Tork', 'Electrical'],
        features: [
            '18V High-Performance Lithium-Ion Battery System',
            'Dual-speed gearbox (0-400 / 0-1500 RPM)',
            '21+1 Torque clutch positions for precision driving',
            'Built-in LED illuminated workspace light',
            'Includes heavy-duty blow-molded carrying case and 100-pc bit kit'
        ],
        specifications: {
            Voltage: '18V DC',
            'No Load Speed': '0-400 / 0-1500 RPM',
            'Max Torque': '45 Nm',
            'Chuck Capacity': '10mm (3/8") Keyless',
            Battery: '2.0Ah Li-ion (2 Batteries Included)'
        }
    },
    {
        name: 'Tork® Premium Diamond Cutting Disc 115mm',
        description: 'High-speed diamond impregnated cutting disc engineered for fast and clean cutting of concrete, masonry, granite, marble, and tough masonry stone.',
        brand: 'Tork',
        category: 'Electricals, Power Tools & Accessories',
        SKU: 'TORK-DCD115',
        barcode: '6948271000102',
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 200,
        tags: ['Cutting Disc', 'Diamond Blade', 'Tork', 'Angle Grinder Accessories'],
        features: [
            'Continuous rim design for extra smooth chip-free cutting',
            'Laser-welded diamond segments for extended blade life',
            'Suitable for both dry and wet cutting operations',
            'Max operating speed: 13,300 RPM'
        ],
        specifications: {
            Diameter: '115mm (4.5")',
            'Bore Size': '22.23mm',
            'Segment Height': '10mm',
            'Max Speed': '13,300 RPM'
        }
    },
    {
        name: 'Tork® Modular Industrial Switch & Socket Set',
        description: 'Heavy-duty fire-retardant industrial wall switch and power socket set designed for high durability in commercial and residential electrical installations.',
        brand: 'Tork',
        category: 'Electricals, Power Tools & Accessories',
        SKU: 'TORK-WS220',
        barcode: '6948271000103',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 500,
        tags: ['Electrical', 'Switches', 'Tork', 'Wiring Accessories'],
        features: [
            'High-grade flame-retardant polycarbonate housing',
            'Silver-alloy contacts for high conductivity and durability',
            '16A 250V AC rated with grounding protection shutter',
            'Sleek modern minimalist design'
        ],
        specifications: {
            Rating: '16A 250V AC',
            Material: 'Polycarbonate + Silver Alloy',
            Certification: 'CE / ISO9001 Certified'
        }
    },

    // ─── EUREX® (Lock Cylinder, Door Handles & Lock Body) ────────────────────
    {
        name: 'Eurex® High-Security Euro Double Lock Cylinder 70mm',
        description: 'Precision engineered brass euro profile lock cylinder featuring anti-pick, anti-drill, and anti-bump protection pins for maximum entrance security.',
        brand: 'Eurex',
        category: 'Lock Cylinder, Door Handles & Lock Body',
        SKU: 'EUR-LC70',
        barcode: '6948271000201',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 150,
        tags: ['Lock Cylinder', 'Door Hardware', 'Eurex', 'Security'],
        features: [
            'Solid brass forged body with satin nickel finish',
            '6-pin tumbler mechanism with hardened anti-drill steel pins',
            'Anti-snap line protection for ultimate burglar resistance',
            'Includes 5 brass dimple computer keys'
        ],
        specifications: {
            Length: '70mm (35/35mm split)',
            Material: 'Solid Forged Brass',
            Pins: '6 Precision Pins',
            Keys: '5 Brass Computer Dimple Keys'
        }
    },
    {
        name: 'Eurex® Premium Stainless Steel Lever Door Handle Set',
        description: 'Architectural grade Grade-304 stainless steel interior/exterior lever handle set with spring-loaded mechanism and matching escutcheon plates.',
        brand: 'Eurex',
        category: 'Lock Cylinder, Door Handles & Lock Body',
        SKU: 'EUR-DH101',
        barcode: '6948271000202',
        image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 120,
        tags: ['Door Handle', 'Door Fittings', 'Eurex', 'Stainless Steel'],
        features: [
            'Corrosion-resistant Grade 304 Brushed Stainless Steel',
            'Tested to 200,000 opening cycles',
            'Concealed screw fixing for clean architectural appearance',
            'Suitable for timber, composite, and metal doors'
        ],
        specifications: {
            Material: 'SUS304 Stainless Steel',
            Finish: 'Satin Stainless Steel (SSS)',
            'Door Thickness': '35mm - 55mm'
        }
    },
    {
        name: 'Eurex® Heavy-Duty Mortise Lock Body 85mm',
        description: 'Commercial grade mortise door lock body with reversible latch bolt and double throw deadbolt for timber and metal doors.',
        brand: 'Eurex',
        category: 'Lock Cylinder, Door Handles & Lock Body',
        SKU: 'EUR-LB85',
        barcode: '6948271000203',
        image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 90,
        tags: ['Mortise Lock', 'Lock Body', 'Eurex', 'Hardware'],
        features: [
            '85mm center distance with 45mm/50mm/60mm backset options',
            'Solid brass latch bolt and double-throw deadbolt',
            'Reversible latch bolt without opening lock case',
            'Fits all standard euro profile cylinders'
        ],
        specifications: {
            Center: '85mm',
            Backset: '50mm',
            Case: 'Galvanized Steel Case',
            Faceplate: 'Stainless Steel 304'
        }
    },

    // ─── NEXT® (Hand Tools & Painting Accessories) ───────────────────────────
    {
        name: 'Next® Heavy-Duty Drop-Forged Claw Hammer 16oz',
        description: 'One-piece drop-forged high-carbon steel claw hammer with shock-absorbent anti-slip rubberized ergonomic grip.',
        brand: 'Next',
        category: 'Hand Tools & Painting Accessories',
        SKU: 'NEXT-CH16',
        barcode: '6948271000301',
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 300,
        tags: ['Hand Tools', 'Claw Hammer', 'Next', 'Hardware'],
        features: [
            'Fully heat-treated carbon steel head for ultimate durability',
            'Precision balanced head-to-handle weight distribution',
            'Cushioned TPR rubber handle reduces strike vibration by 70%',
            'Curved claw for effortless nail extraction'
        ],
        specifications: {
            Weight: '16 oz (450g)',
            Head: 'Drop-Forged Carbon Steel',
            Handle: 'TPR Shock Reduction Grip'
        }
    },
    {
        name: 'Next® Professional Combination Pliers 8-inch',
        description: 'Industrial combination pliers forged from Chrome Vanadium (Cr-V) steel with hardened cutting edges for heavy wire cutting and gripping.',
        brand: 'Next',
        category: 'Hand Tools & Painting Accessories',
        SKU: 'NEXT-CP08',
        barcode: '6948271000302',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 250,
        tags: ['Pliers', 'Hand Tools', 'Next', 'Cr-V Steel'],
        features: [
            'Forged Chrome Vanadium steel construction',
            'Induction hardened cutting edges (HRC 60-62)',
            'Dual-component anti-slip insulated safety handles',
            'Integrate pipe grip and cable cutter jaw'
        ],
        specifications: {
            Length: '200mm (8 Inch)',
            Material: 'Chrome Vanadium (Cr-V)',
            Hardness: 'HRC 60-62'
        }
    },
    {
        name: 'Next® Microfiber Paint Roller & Brush Kit 9-inch',
        description: 'Complete painting accessory set including 9" roller frame, high-density lint-free microfiber sleeves, 2" synthetic brush, and durable paint tray.',
        brand: 'Next',
        category: 'Hand Tools & Painting Accessories',
        SKU: 'NEXT-PRK01',
        barcode: '6948271000303',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 180,
        tags: ['Painting', 'Paint Roller', 'Next', 'Decorating'],
        features: [
            'High-density microfiber roller covers for maximum paint absorption',
            'Smooth 5-wire heavy gauge steel roller frame with threaded handle',
            'Includes 2-inch angled sash brush for edge trim',
            'Suitable for acrylic, latex, water-based, and oil-based paints'
        ],
        specifications: {
            'Roller Size': '9 Inch (230mm)',
            Nap: '12mm Microfiber',
            Kit: 'Roller Frame + 2 Covers + 2" Brush + Paint Tray'
        }
    },
    {
        name: 'Next® Industrial Measuring Tape 5M / 16FT',
        description: 'Compact shock-proof rubber armored measuring tape featuring 25mm extra-wide nylon-coated steel blade with magnetic tip hook.',
        brand: 'Next',
        category: 'Hand Tools & Painting Accessories',
        SKU: 'NEXT-MT05',
        barcode: '6948271000304',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 400,
        tags: ['Measuring Tape', 'Next', 'Hand Tools', 'Measuring'],
        features: [
            '5 Meters / 16 Feet length with metric & imperial dual scales',
            'Extra-wide 25mm blade allows 2.4 meter standout',
            'Nylon blade coating provides 10x higher abrasion resistance',
            'Powerful dual magnets on end-hook for steel measuring'
        ],
        specifications: {
            Length: '5M / 16FT',
            'Blade Width': '25mm',
            Accuracy: 'Class II Standard'
        }
    },

    // ─── MARK SAFETY PRO (Safety Shoes & Safety Products) ───────────────────
    {
        name: 'Mark Safety Pro® S3 Steel Toe Leather Safety Shoes',
        description: 'High-cut premium genuine buffalo leather safety boots with CE EN ISO 20345:2011 S3 SRC certification, steel toe cap, and anti-puncture steel midsole.',
        brand: 'Mark Safety Pro',
        category: 'Safety Shoes & Safety Products',
        SKU: 'MSP-SS01',
        barcode: '6948271000401',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 350,
        tags: ['Safety Shoes', 'Steel Toe', 'Mark Safety Pro', 'PPE'],
        features: [
            'CE EN ISO 20345:2011 S3 SRC Certified',
            '200J Impact-resistant steel toe cap',
            'Kevlar/Steel anti-penetration midsole (1100N protection)',
            'Oil, chemical, and slip-resistant dual density PU outsole',
            'Breathable 3D mesh inner lining with anatomical cushioned footbed'
        ],
        specifications: {
            Rating: 'S3 SRC ESD',
            Upper: 'Water-Resistant Action Leather',
            'Toe Cap': 'Steel 200 Joules',
            Sole: 'Dual Density Polyurethane (PU)'
        }
    },
    {
        name: 'Mark Safety Pro® High-Density Vented Safety Helmet',
        description: 'Industrial hard hat constructed from high-density ABS resin with 6-point textile suspension harness and ratchet adjustment system.',
        brand: 'Mark Safety Pro',
        category: 'Safety Shoes & Safety Products',
        SKU: 'MSP-HH02',
        barcode: '6948271000402',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 500,
        tags: ['Hard Hat', 'Safety Helmet', 'Mark Safety Pro', 'PPE'],
        features: [
            'EN 397:2012 Industrial Safety Helmet standard',
            'Side slots for mounting ear defenders and face shields',
            'Wheel ratchet suspension for fast one-handed adjustment',
            'Top ventilation ports for high airflow in hot climates'
        ],
        specifications: {
            Material: 'High-Impact ABS Shell',
            Standard: 'EN 397:2012',
            Harness: '6-Point Textile Webbing'
        }
    },
    {
        name: 'Mark Safety Pro® Heavy-Duty Cut-Resistant Work Gloves',
        description: 'Level 5 cut-resistant HPPE knitted gloves dipped in sandy nitrile palm coating for high oil grip and mechanical protection.',
        brand: 'Mark Safety Pro',
        category: 'Safety Shoes & Safety Products',
        SKU: 'MSP-GL05',
        barcode: '6948271000403',
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 600,
        tags: ['Safety Gloves', 'Mark Safety Pro', 'Cut Resistant', 'PPE'],
        features: [
            'EN 388:2016 Cut Level D / ANSI Cut Level 4 rated',
            '13-Gauge HPPE seamless knit liner',
            'Sandy Nitrile palm micro-foam finish provides maximum wet/dry grip',
            'Elasticated wrist cuff keeps dirt and debris out'
        ],
        specifications: {
            Standard: 'EN 388 4X43D',
            Liner: 'HPPE / Glass Fiber / Spandex',
            Coating: 'Micro-Foam Sandy Nitrile'
        }
    },

    // ─── CLEXO® (Sanitary Wares) ─────────────────────────────────────────────
    {
        name: 'Clexo® Ceramic Countertop Designer Wash Basin',
        description: 'Luxury vitreous china ceramic countertop vessel sink with anti-bacterial nano self-cleaning glaze for modern bathroom interiors.',
        brand: 'Clexo',
        category: 'Sanitary Wares',
        SKU: 'CLX-WB01',
        barcode: '6948271000501',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 80,
        tags: ['Sanitary Ware', 'Wash Basin', 'Clexo', 'Bathroom Fittings'],
        features: [
            'High-grade Vitreous China fired at 1280°C',
            'Ultra-smooth Nano-Glaze resists lime scale and stains',
            'Above-counter vessel installation',
            'Standard 45mm pop-up waste hole size'
        ],
        specifications: {
            Dimensions: '500 x 380 x 140 mm',
            Material: 'Vitreous China Ceramic',
            Color: 'Gloss Alpine White'
        }
    },
    {
        name: 'Clexo® Premium Chrome Brass Basin Mixer Tap',
        description: 'Single-lever hot and cold water basin mixer faucet constructed from solid DR brass with durable 5-layer mirror chrome finish and ceramic disc cartridge.',
        brand: 'Clexo',
        category: 'Sanitary Wares',
        SKU: 'CLX-MT03',
        barcode: '6948271000502',
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 140,
        tags: ['Mixer Tap', 'Faucet', 'Clexo', 'Sanitary Ware'],
        features: [
            'Dezincification Resistant (DZR) solid brass body',
            '35mm Sedal ceramic disc cartridge tested to 500,000 cycles',
            'Swiss Neoperl water-saving aerator reduces splattering',
            'Includes 2x 50cm flexible stainless steel braided water supply hoses'
        ],
        specifications: {
            Finish: 'Electroplated Chrome',
            Cartridge: '35mm Ceramic Disc',
            'Operating Pressure': '0.5 - 5.0 Bar'
        }
    },

    // ─── EDON & TENZO (Power Tools & Machineries) ────────────────────────────
    {
        name: 'EDON® Inverter ARC MMA-200 Welding Machine',
        description: 'Portable IGBT inverter welding machine designed for stick MMA arc welding with digital display, hot start, arc force, and anti-stick features.',
        brand: 'EDON',
        category: 'Power Tools & Machineries',
        SKU: 'EDON-MMA200',
        barcode: '6948271000601',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 60,
        tags: ['Welding Machine', 'Inverter Welder', 'EDON', 'Machinery'],
        features: [
            'Advanced IGBT Inverter technology with high energy efficiency',
            'Digital current meter display for precise output control',
            'Automatic over-voltage, over-current, and thermal protection',
            'Supports 1.6mm - 4.0mm electrode welding rods'
        ],
        specifications: {
            'Input Voltage': '220V ±15% 50/60Hz',
            'Output Current': '20 - 200 Amps',
            'Duty Cycle': '60% @ 200A',
            Weight: '4.8 kg'
        }
    },
    {
        name: 'TENZO® 850W Heavy Duty Angle Grinder 115mm',
        description: 'Compact 850 Watt high-torque motor angle grinder with dust-proof labyrinth construction for grinding, cutting, and deburring metal.',
        brand: 'TENZO',
        category: 'Power Tools & Machineries',
        SKU: 'TNZ-AG850',
        barcode: '6948271000701',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 120,
        tags: ['Angle Grinder', 'TENZO', 'Power Tools', 'Grinder'],
        features: [
            '850W Heavy-duty copper armature motor',
            '11,000 RPM high speed output',
            'Burst-proof adjustable safety guard',
            '2-Position auxiliary side handle for comfortable control'
        ],
        specifications: {
            Power: '850 Watts',
            'Disc Diameter': '115mm (4-1/2")',
            Speed: '11,000 RPM',
            Spindle: 'M14 Thread'
        }
    },
    {
        name: 'TENZO® 20V Brushless Cordless Impact Drill',
        description: 'High performance 20V brushless motor hammer drill driver delivering 60Nm torque for heavy drilling in masonry, steel, and timber.',
        brand: 'TENZO',
        category: 'Power Tools & Machineries',
        SKU: 'TNZ-CD20V',
        barcode: '6948271000702',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 75,
        tags: ['Brushless Drill', 'TENZO', 'Power Tools', 'Cordless'],
        features: [
            'Maintenance-free Brushless Motor delivers 50% longer runtime',
            'Heavy-duty 13mm metal keyless chuck',
            '3-In-1 Selector: Screw driving, Drilling, Hammer Drilling',
            'Includes 2x 4.0Ah Li-ion batteries & fast charger'
        ],
        specifications: {
            Voltage: '20V Max',
            'Max Torque': '60 Nm',
            'Impact Rate': '0 - 25,500 IPM',
            'Chuck Size': '13mm All-Metal'
        }
    },

    // ─── PARTNER BRANDS (Makita, Total, Jotun, Vini-Tape) ─────────────────────
    {
        name: 'Makita® 800W SDS-Plus 26mm Rotary Hammer',
        description: 'Heavy duty 3-mode SDS-Plus rotary hammer drill (Rotation only, Hammering with Rotation, Hammering only) built for professional construction drilling.',
        brand: 'Makita',
        category: 'Power Tools & Machineries',
        SKU: 'MKT-HR2470',
        barcode: '0088381084207',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 45,
        tags: ['Makita', 'Rotary Hammer', 'Power Tools', 'SDS Plus'],
        features: [
            '800W motor delivers 2.4 Joules of impact energy',
            '3-Mode operation for versatile jobsite performance',
            'Torque limiter stops rotation if bit jams',
            'Recessed lock-on button for continuous use'
        ],
        specifications: {
            Power: '800 Watts',
            'Concrete Capacity': '26mm',
            'Impact Energy': '2.4 J',
            Weight: '2.9 kg'
        }
    },
    {
        name: 'Jotun® Fenomastic Pure Colours Interior Paint 18L',
        description: 'Superior quality acrylic emulsion paint providing smooth matt finish, accurate color retention, and easy washable surface.',
        brand: 'Jotun',
        category: 'Hand Tools & Painting Accessories',
        SKU: 'JTN-FPC18',
        barcode: '7025120000010',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 100,
        tags: ['Jotun', 'Paint', 'Interior Paint', 'Wall Paint'],
        features: [
            'Smooth rich matt appearance with superior coverage',
            'Washable with water and mild detergent',
            'Low VOC and virtually odorless indoor application',
            'Anti-fungal and anti-bacterial shield'
        ],
        specifications: {
            Volume: '18 Liters Drum',
            Finish: 'Matt Finish',
            Coverage: '10 - 12 sq.m / Liter'
        }
    },
    {
        name: 'Vini-Tape® Industrial Electrical PVC Insulation Tape',
        description: 'Premium Japanese-grade flame-retardant PVC electrical insulation tape engineered for primary electrical insulation up to 600V.',
        brand: 'Vini-Tape',
        category: 'Electricals, Power Tools & Accessories',
        SKU: 'VNI-TP10',
        barcode: '4901860100019',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80'
        ],
        price: 0,
        enquiryOnly: true,
        stock: 1000,
        tags: ['Vini-Tape', 'Electrical Tape', 'PVC Tape', 'Electrical'],
        features: [
            'JIS C 2336 & CE Certified electrical insulation',
            'Flame retardant and self-extinguishing PVC film',
            'High dielectric strength up to 5000V',
            'Resistant to weather, moisture, acids, and alkalis'
        ],
        specifications: {
            Dimensions: '19mm x 20m x 0.13mm',
            Material: 'Plasticized PVC + Rubber Adhesive',
            Origin: 'Made in Japan'
        }
    }
];

module.exports = products;
