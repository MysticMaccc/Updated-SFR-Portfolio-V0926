import {
  Document, Page, Text, View, StyleSheet, Link,
} from '@react-pdf/renderer';
import type { PortfolioData, Experience, Education } from '@/types';

/*
 * Singapore CV format — A4, 2–3 pages, no photo, no personal particulars
 * beyond contact details (TAFEP fair employment guidelines).
 * Section order: Profile → Skills → Work Experience → Projects → Certifications → References
 * Bullets are written as achievement statements (quantified where possible).
 */

const C = {
  ink:       '#111827',
  body:      '#374151',
  muted:     '#6B7280',
  faint:     '#9CA3AF',
  rule:      '#D1D5DB',
  ruleLight: '#E5E7EB',
  navy:      '#1E3A5F',
  navyMid:   '#2D5282',
  accentBar: '#1D4ED8',
  rowBg:     '#F9FAFB',
  white:     '#FFFFFF',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 36,
    paddingBottom: 58,
    paddingHorizontal: 0,
    fontSize: 9.5,
    color: C.body,
    backgroundColor: C.white,
  },

  /* ── Header band ─────────────────────────────────────── */
  headerBand: {
    backgroundColor: C.navy,
    marginTop: -36,
    paddingTop: 34,
    paddingBottom: 26,
    paddingHorizontal: 46,
  },
  headerName: {
    fontSize: 26,
    fontFamily: 'Helvetica-Bold',
    color: C.white,
    letterSpacing: -0.4,
  },
  headerTitle: {
    fontSize: 11.5,
    color: '#93C5FD',
    marginTop: 4,
    letterSpacing: 0.4,
  },
  headerDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginTop: 14,
    marginBottom: 10,
  },
  headerContactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headerContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
    marginBottom: 4,
  },
  headerContactLabel: {
    fontSize: 7,
    color: '#93C5FD',
    marginRight: 4,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.6,
  },
  headerContactText: { fontSize: 8.5, color: '#E0F2FE' },
  headerContactLink: { fontSize: 8.5, color: '#BAE6FD', textDecoration: 'none' },

  /* ── Body ────────────────────────────────────────────── */
  body: { paddingHorizontal: 46, paddingTop: 22 },

  /* ── Sections ────────────────────────────────────────── */
  section: { marginBottom: 16 },
  sectionHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.navy,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginRight: 9,
  },
  sectionLine: {
    flex: 1,
    height: 0.75,
    backgroundColor: C.rule,
  },

  /* ── Profile summary ─────────────────────────────────── */
  summary: { fontSize: 9.5, color: C.body, lineHeight: 1.65 },

  /* ── Skills ──────────────────────────────────────────── */
  skillRow: { flexDirection: 'row', marginBottom: 3.5 },
  skillCat: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.ink,
    width: 128,
  },
  skillList: { fontSize: 9, color: C.body, flex: 1, lineHeight: 1.5 },

  /* ── Experience ──────────────────────────────────────── */
  expBlock: { marginBottom: 13 },
  expHeaderBox: {
    backgroundColor: C.rowBg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderLeftColor: C.accentBar,
    borderLeftWidth: 3,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  expRole: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: C.ink },
  expCompany: { fontSize: 9.5, color: C.navyMid, marginTop: 2 },
  expDateBadge: {
    fontSize: 8.5,
    color: C.muted,
    textAlign: 'right',
    marginTop: 1,
  },
  bullet: { flexDirection: 'row', marginBottom: 3, paddingLeft: 4 },
  bulletDot: { fontSize: 9, color: C.accentBar, marginRight: 7, marginTop: 0.5 },
  bulletText: { fontSize: 9, color: C.body, flex: 1, lineHeight: 1.55 },

  /* ── Projects ────────────────────────────────────────── */
  projBlock: { marginBottom: 8.5 },
  projTitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  projTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.ink },
  projTech: { fontSize: 8, color: C.muted, marginLeft: 7 },
  projDesc: { fontSize: 9, color: C.body, lineHeight: 1.55 },

  /* ── Education ───────────────────────────────────────── */
  eduBlock: { marginBottom: 9 },
  eduHeaderBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  eduDegree: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.ink },
  eduField: { fontSize: 9, color: C.navyMid, marginTop: 1.5 },
  eduInstitution: { fontSize: 9, color: C.body, marginTop: 1 },
  eduDate: { fontSize: 8.5, color: C.muted, textAlign: 'right' },
  eduDesc: { fontSize: 8.5, color: C.muted, marginTop: 3, lineHeight: 1.45 },

  /* ── Certifications ──────────────────────────────────── */
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
    marginBottom: 4,
    borderBottomColor: C.ruleLight,
    borderBottomWidth: 0.5,
  },
  certTitle: { fontSize: 9, color: C.ink, flex: 1, paddingRight: 14, lineHeight: 1.45 },
  certMeta: { fontSize: 8.5, color: C.muted, textAlign: 'right' },

  /* ── Footer ──────────────────────────────────────────── */
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 46,
    right: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: C.ruleLight,
    borderTopWidth: 0.75,
    paddingTop: 7,
  },
  footerText: { fontSize: 7.5, color: C.faint },
});

function SectionHeading({ children }: { children: string }) {
  return (
    <View minPresenceAhead={55} style={styles.sectionHeadingRow}>
      <Text style={styles.sectionTitle}>{children}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

function sortLatestFirst(experiences: Experience[]): Experience[] {
  return [...experiences].sort((a, b) => {
    if (a.is_current !== b.is_current) return a.is_current ? -1 : 1;
    return (parseInt(b.start_date) || 0) - (parseInt(a.start_date) || 0);
  });
}

function sortEducationLatestFirst(educations: Education[]): Education[] {
  return [...educations].sort((a, b) => {
    if (a.is_current !== b.is_current) return a.is_current ? -1 : 1;
    return (parseInt(b.start_year) || 0) - (parseInt(a.start_year) || 0);
  });
}

export default function ResumePDF({ data }: { data: PortfolioData }) {
  const { profile, experiences, skills, projects, trainings, educations } = data;

  const sortedExperiences = sortLatestFirst(experiences);
  const sortedEducations = sortEducationLatestFirst(educations);

  const selectedProjects = projects;

  const grouped = skills.reduce<Record<string, string[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s.name);
    return acc;
  }, {});

  const sortedTrainings = [...trainings].sort(
    (a, b) => (parseInt(b.year ?? '') || 0) - (parseInt(a.year ?? '') || 0)
  );

  const name = profile?.name ?? 'Sherwin Christopher F. Roxas';

  return (
    <Document title={`${name} — CV`} author={name}>
      <Page size="A4" style={styles.page}>

        {/* ── Header Band ───────────────────────────────── */}
        <View style={styles.headerBand}>
          <Text style={styles.headerName}>{name}</Text>
          <Text style={styles.headerTitle}>{profile?.title ?? 'Full Stack Developer'}</Text>
          <View style={styles.headerDivider} />
          <View style={styles.headerContactRow}>
            {profile?.email && (
              <View style={styles.headerContactItem}>
                <Text style={styles.headerContactLabel}>EMAIL</Text>
                <Link src={`mailto:${profile.email}`} style={styles.headerContactLink}>
                  {profile.email}
                </Link>
              </View>
            )}
            {profile?.phone && (
              <View style={styles.headerContactItem}>
                <Text style={styles.headerContactLabel}>TEL</Text>
                <Text style={styles.headerContactText}>{profile.phone}</Text>
              </View>
            )}
            {profile?.linkedin && (
              <View style={styles.headerContactItem}>
                <Text style={styles.headerContactLabel}>LINKEDIN</Text>
                <Link src={profile.linkedin} style={styles.headerContactLink}>
                  {profile.linkedin
                    .replace('https://www.linkedin.com/in/', 'linkedin.com/in/')
                    .replace('https://linkedin.com/in/', 'linkedin.com/in/')}
                </Link>
              </View>
            )}
            {profile?.github && (
              <View style={styles.headerContactItem}>
                <Text style={styles.headerContactLabel}>GITHUB</Text>
                <Link src={profile.github} style={styles.headerContactLink}>
                  {profile.github.replace('https://github.com/', 'github.com/')}
                </Link>
              </View>
            )}
            {profile?.portfolio_url && (
              <View style={styles.headerContactItem}>
                <Text style={styles.headerContactLabel}>PORTFOLIO</Text>
                <Link src={profile.portfolio_url} style={styles.headerContactLink}>
                  {profile.portfolio_url.replace('https://', '')}
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* ── Body ──────────────────────────────────────── */}
        <View style={styles.body}>

          {/* 1. Professional Profile */}
          {profile?.bio && (
            <View style={styles.section}>
              <SectionHeading>Professional Profile</SectionHeading>
              <Text style={styles.summary}>{profile.bio}</Text>
            </View>
          )}

          {/* 2. Key Technical Competencies */}
          {Object.keys(grouped).length > 0 && (
            <View style={styles.section}>
              <SectionHeading>Key Technical Competencies</SectionHeading>
              {Object.entries(grouped).map(([cat, names]) => (
                <View key={cat} style={styles.skillRow} wrap={false}>
                  <Text style={styles.skillCat}>{cat}</Text>
                  <Text style={styles.skillList}>{names.join(', ')}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 3. Work Experience */}
          {sortedExperiences.length > 0 && (
            <View style={styles.section}>
              <SectionHeading>Work Experience</SectionHeading>
              {sortedExperiences.map(exp => (
                <View key={exp.id} style={styles.expBlock}>
                  <View minPresenceAhead={48}>
                    <View style={styles.expHeaderBox}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.expRole}>{exp.role}</Text>
                        <Text style={styles.expCompany}>{exp.company}</Text>
                      </View>
                      <Text style={styles.expDateBadge}>
                        {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                      </Text>
                    </View>
                  </View>
                  {exp.description.map((d, i) => (
                    <View key={i} style={styles.bullet}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletText}>{d}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* 4. Education */}
          {sortedEducations.length > 0 && (
            <View style={styles.section}>
              <SectionHeading>Education</SectionHeading>
              {sortedEducations.map(edu => (
                <View key={edu.id} style={styles.eduBlock} wrap={false}>
                  <View style={styles.eduHeaderBox}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.eduDegree}>{edu.degree} in {edu.field_of_study}</Text>
                      <Text style={styles.eduInstitution}>{edu.institution}</Text>
                    </View>
                    <Text style={styles.eduDate}>
                      {edu.start_year} – {edu.is_current ? 'Present' : (edu.end_year ?? '')}
                    </Text>
                  </View>
                  {edu.description ? (
                    <Text style={styles.eduDesc}>{edu.description}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}

          {/* 5. Selected Projects — all projects */}
          {selectedProjects.length > 0 && (
            <View style={styles.section}>
              <SectionHeading>Selected Projects</SectionHeading>
              {selectedProjects.map(p => (
                <View key={p.id} style={styles.projBlock} wrap={false}>
                  <View style={styles.projTitleRow}>
                    <Text style={styles.projTitle}>{p.title}</Text>
                    {p.tech_stack.length > 0 && (
                      <Text style={styles.projTech}>{p.tech_stack.join(' · ')}</Text>
                    )}
                  </View>
                  {p.description ? <Text style={styles.projDesc}>{p.description}</Text> : null}
                </View>
              ))}
            </View>
          )}

          {/* 5. Certifications & Training */}
          {sortedTrainings.length > 0 && (
            <View style={styles.section}>
              <SectionHeading>Certifications & Training</SectionHeading>
              {sortedTrainings.map(t => (
                <View key={t.id} style={styles.certRow} wrap={false}>
                  <Text style={styles.certTitle}>{t.title}</Text>
                  <Text style={styles.certMeta}>
                    {t.provider}{t.year ? `  ·  ${t.year}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

        </View>

        {/* Footer — every page */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{name}  ·  Curriculum Vitae</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
