import pandas as pd

# Full list of jobs from the original document
jobs = ["Abogado", "Acondicionador fisico", "Acordeonista", "Acróbata", "Actor", "Actriz", "Administrador", "Aduanero", "Aerotécnico", "Agente", "Agricultor", "Agrólogo", "Agrónomo", "Albañil", "Alfarero", "Almacenista", "Analista", "Anatomista", "Anestesiólogo", "Anunciador", "Apicultor", "Árbitro", "Archivista", "Armador", "Arqueólogo", "Arquitecto", "Artesano", "Artista", "Asesor", "Asistente", "Astrólogo", "Astrónomo", "Atleta", "Audiólogo", "Auditor", "Auxiliar", "Avaluador", "Ayudante", "Azafata", "Bacteriólogo", "Banquero", "Barman", "Barrendero", "Bibliotecario", "Bibliotecólogo", "Bioestadístico", "Biofísico", "Biógrafo", "Biólogo", "Biometrista", "Bioquímico", "Biotecnólogo", "Bodeguero", "Bombero", "Brillador", "Caficultor", "Cajero", "Camarero", "Camarógrafo", "Camillero", "Camionero", "Cantante", "Cantautor", "Cantinero", "Capataz", "Capitán", "Cardiólogo", "Cargador", "Caricaturista", "Carnicero", "Carpintero", "Cartero", "Cartógrafo", "Cartomántico", "Celador", "Ceramista", "Cerrajero", "Cervecero", "Chef", "Chofer", "Ciclista", "Científico", "Cinematógrafo", "Cirujano", "Clasificador", "Climatólogo", "Cobrador", "Cocinero", "Coctelero", "Columnista", "Comandante", "Comediante", "Comentarista", "Comerciante", "Comisario", "Community Manager", "Compilador", "Compositor", "Comprador", "Comunicador", "Conductor", "Confitero", "Consejero", "Conserje", "Conservador", "Constructor", "Consultor", "Contador", "Contralor", "Contratista", "Controlador", "Coordinador", "Copiloto", "Coreógrafo", "Coronel", "Corrector", "Corredor", "Corresponsal", "Cortador", "Cosechero", "Cosmetólogo", "Costurero(a)", "Cotero", "Courier", "Creador", "Creativo", "Criador", "Cristalero", "Cristalógrafo", "Crítico", "Cuentista", "Cuidador", "Cultivador", "Decano", "Decorador", "Degustador", "Delegado", "Delineante", "Demógrafo", "Demostrador", "Dependiente", "Depilador", "Deportista", "Dermatólogo", "Desarrollador", "Diagramador", "Dibujante", "Dietista", "Digitador", "Director", "Dirigente", "Diseñador", "DJ", "Doblador", "Documentador", "Documentalista", "Empleada Doméstica", "Dramaturgo", "Ebanista", "Ecologista", "Ecólogo", "Econometrista", "Economista", "Ecónomo", "Editor", "Educador", "Ejecutivo", "Electricista", "Electromecánico", "Electroquímico", "Embalador", "Embolador", "Embutidor", "Empacador", "Empresario", "Encargado", "Enchapador", "Encuestador", "Enfermero(a)", "Enfriador", "Enganchador", "Enólogo", "Entrenador", "Epidemiólogo", "Ergonomista", "Ergoterapeuta", "Escalador", "Escaneador", "Escenógrafo", "Escobero", "Escolta", "Escritor", "Escrutador", "Escultor", "Esmaltador", "Especialista", "Estadístico", "Estampador", "Esteticista", "Estratega", "Etiqueteador", "Evaluador", "Evangelizador", "Experto", "Fabricante", "Facilitador", "Farmaceuta", "Filólogo", "Filósofos", "Finalizador", "Fiscal", "Fisiatra", "Físico", "Fisiólogo", "Fisioterapeuta", "Fisioterapista", "Floricultor", "Fonoaudiólogo", "Fontanero", "Forjador", "Fotógrafo", "Fumigador", "Funcionario", "Fundidor", "Fusionador", "Futbolista", "Galponero", "Galvanizador", "Gastroenterólogo", "Genealogista", "General", "Genetista", "Geofísico", "Geógrafo", "Geólogo", "Geoquímico", "Geotecnista", "Gerente", "Geriatra", "Gerontólogo", "Ginecólogo", "Grabador", "Graficador", "Grafólogo", "Guardabosques", "Guardacostas", "Guardaespaldas", "Guardia", "Guía", "Guía-Intérprete", "Guionista", "Guitarrista", "Hematólogo", "Herbolario", "Herrador", "Herramentista", "Herrero", "Hidrobiólogo", "Hidrogenador", "Hidrólogo", "Higienista", "Histólogo", "Historiador", "Homeópata", "Horticultor", "Humorista", "Iluminador", "Ilusionista", "Ilustrador", "Imitador", "Impermeabilizador", "Implantólogo", "Impregnador", "Impresor", "Impulsador", "Infante", "Informador", "Ingeniero (a)", "Inmunólogo", "Inseminador", "Inspector", "Instalador", "Institutriz", "Instructor", "Instrumentador", "Instrumentalista", "Intermediario", "Internista", "Intérprete", "Interventor", "Investigador", "Islero", "Jardinero (a)", "Jefe", "Jornalero", "Joyero", "Laboratorista", "Laminador", "Latonero", "Lavador", "Lector", "Leñador", "Libretista", "Líder", "Limpiador", "Lingüista", "Litógrafo", "Locutor", "Lubricador", "Luchador", "Manicurista", "Maquinista", "Marcador", "Marquetero", "Matemático", "Mayordomo", "Mecánico", "Mediador", "Médico(a)", "Mensajero", "Mercaderista", "Mercadotecnista", "Mesero", "Meteorólogo", "Microbiólogo", "Minero", "Modelista", "Modelo", "Montador", "Músico", "Naturista", "Neurocirujano", "Neurólogo", "Neuropatólogo", "Niñera", "Numerólogo", "Nutricionista", "Obrero", "Obstetra", "Oceanógrafo", "Ocularista", "Odontólogo", "Oficinista", "Oftalmólogo", "Oncólogo", "Operador", "Operario (a)", "Optómetra", "Oreador", "Organista", "Organizador", "Orientador", "Ortodoncista", "Ortopedista", "Osteópata", "Otorrinolaringólogo", "Panadero", "Paramédico", "Parasitólogo", "Parrillero", "Patronista", "Pedagogo", "Pediatra", "Pedicurista", "Peluquero", "Perforador", "Periodista", "Piloto", "Pintor", "Piscinero", "Pizzero", "Planchador", "Planificador", "Plomero", "Portero", "Practicante", "Presentador", "Productor", "Profesional", "Profesor", "Programador", "Promotor", "Psicólogo", "Psiquiatra", "Publicista", "Químico", "Quiropráctico", "Radiógrafo", "Radiólogo", "Recaudador", "Recepcionista", "Reciclador", "Recocedor", "Recolector", "Recreacionista", "Regente", "Regulador", "Relacionista", "Relator", "Relojero", "Reportero", "Representante", "Residente", "Restaurador", "Retocador", "Retratista", "Reumatólogo", "Salvavidas", "Sastre", "Secretaria (o)", "Socorrista", "Soldador", "Subdirector", "Subgerente", "Supervisor", "Surtidor", "Tallador", "Tapicero", "Taquillero", "Técnico", "Tecnólogo", "Telemercaderista", "Teñidor", "Terapeuta", "Tipógrafo", "Topógrafo", "Traductor", "Tramitador", "Traumatólogo", "Urólogo", "Utilero", "Vendedor", "Veterinario", "Vicepresidente", "Vigilante", "Violinista", "Vocalista", "Vocero", "Volquetero", "Webmaster", "Zapatero", "Zoólogo", "Zootecnista", "Antropólogo"]

# Comprehensive job categorization function
def categorize_job(job):
    categories = {
        "Trabajos en Oficios Varios, Aseo y Seguridad": [
            "Vigilante", "Barrendero", "Portero", "Limpiador", "Escobero", 
            "Guardaespaldas", "Guardacostas", "Guardia", "Salvavidas", "Socorrista"
        ],
        "Trabajos en Manufactura": [
            "Sastre", "Retocador", "Costurero", "Carpintero", "Herrero", "Ebanista", 
            "Alfarero", "Joyero", "Ceramista", "Artesano", "Tapicero", "Zapatero"
        ],
        "Producción y Cargos Operativos": [
            "Operario", "Obrero", "Embalador", "Empacador", "Cargador", "Surtidor", 
            "Instalador", "Montador", "Técnico"
        ],
        "Trabajos en Construcción, Oficios y Artesanías": [
            "Albañil", "Constructor", "Electricista", "Plomero", "Fontanero", 
            "Cerrajero", "Enchapador", "Soldador"
        ],
        "Trabajos Técnicos, Reparaciones y Mantenimiento": [
            "Mecánico", "Electromecánico", "Instalador", "Reparador"
        ],
        "Trabajos en Ventas, Servicio al cliente y Marketing": [
            "Vendedor", "Cajero", "Dependiente", "Mesero", "Azafata", "Recepcionista", 
            "Promotor", "Mercaderista", "Community Manager"
        ],
        "Trabajos en Medios, Arte y Producción Audiovisual": [
            "Actor", "Actriz", "Fotógrafo", "Camarógrafo", "Periodista", "DJ", 
            "Locutor", "Escritor", "Músico", "Cantante", "Compositor"
        ],
        "Trabajos en Dirección y Gerencia": [
            "Gerente", "Director", "Jefe", "Administrador", "Coordinador", 
            "Supervisor", "Subgerente", "Vicepresidente"
        ],
        "Trabajos Profesionales, Consultorías y Servicios Empresariales": [
            "Abogado", "Contador", "Auditor", "Consultor", "Asesor", "Economista", 
            "Analista", "Empresario"
        ],
        "Trabajos en Informática, Tecnología y Sistemas": [
            "Programador", "Desarrollador", "Webmaster", "Diseñador", "Digitador", 
            "Analista de sistemas"
        ],
        "Trabajos en Ingeniería": [
            "Ingeniero", "Arquitecto", "Geólogo", "Físico", "Químico", "Electromecánico"
        ],
        "Trabajos en Agricultura y Recursos Naturales": [
            "Agricultor", "Agrónomo", "Veterinario", "Horticultor", "Floricultor", 
            "Caficultor", "Guardabosques"
        ],
        "Trabajos en Educación, Formación y Docencia": [
            "Profesor", "Pedagogo", "Instructor", "Orientador", "Educador"
        ],
        "Trabajos en Salud y Medicina": [
            "Médico", "Enfermero", "Dentista", "Cirujano", "Psicólogo", 
            "Paramédico", "Nutricionista", "Fisioterapeuta"
        ],
        "Trabajos en Ciencia e Investigación": [
            "Científico", "Investigador", "Biólogo", "Matemático", "Antropólogo", 
            "Arqueólogo", "Historiador"
        ],
        "Trabajos en Hotelería, Turismo y Gastronomía": [
            "Chef", "Cocinero", "Panadero", "Camarero", "Barman", 
            "Guía turístico", "Recepcionista de hotel"
        ]
    }
    
    # Refine categorization to handle variations and partial matches
    for category, job_list in categories.items():
        if any(j.lower() in job.lower() or job.lower() in j.lower() for j in job_list):
            return category
    
    return "Otros"

# Categorize all jobs
job_categorizations = [
    {"Cargo": job, "Categoría": categorize_job(job)} for job in jobs
]

# Create DataFrame
df = pd.DataFrame(job_categorizations)

# Export to Excel
df.to_excel("Categorizacion_Cargos.xlsx", index=False)

print(f"Excel generado exitosamente: Categorizacion_Cargos.xlsx\nTotal de cargos: {len(jobs)}")
